<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Log;

class Subject extends Model
{

    protected $table = 'subject';
    use Loggable;
    use HasFactory, SoftDeletes;

    public function setData($data)
    {
        $this->group_id = $data['group_id'];
        $this->teacher_id = $data['teacher_id'];
        $this->start_date = $data['start_date'];
        $this->end_date = $data['end_date'];
        $this->remark = $data['remark'];
    }

    public static function getList(Request $request)
    {
        $filter = $request->filter;
        $txt_src = isset($filter['txt_src']) ? $filter['txt_src'] : null;
        $data = self::join('group', 'subject.group_id', 'group.id')
            ->when($txt_src, function ($query) use ($txt_src) {
                $query->where('subject.name', 'LIKE', '%' . $txt_src . '%');
            })
            ->select(
                'subject.*',
                'group.name as group',
            )->orderBy('start_date', 'desc');
        return $data;
    }

    public function studentScore()
    {
        return $this->hasMany('App\Models\StudentScore', 'score_id', 'id')
            ->join('student', 'student_score.student_id', 'student.id')
            ->select(
                'student_score.*',
                'student.name',
                'student.latin_name',
            )
            ->orderBy('student.latin_name', 'ASC');
    }

}
