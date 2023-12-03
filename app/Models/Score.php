<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Log;

class Score extends Model
{

    protected $table = 'score';
    use Loggable;
    use HasFactory, SoftDeletes;

    public function setData($data)
    {
        $this->group_id = $data['start_date'];
        $this->section_id = $data['end_date'];
        $this->classing_type = $data['group_id'];
        $this->classing_type = $data['section_id'];
        $this->classing_type = $data['score_type'];
        $this->classing_type = $data['total_score'];
        $this->date_time = $data['date_time'];
        $this->remark = $data['remark'] == 'null' ? null : $data['remark'];
    }

    public static function getList(Request $request)
    {
        $filter = $request->filter;
        $group_selected = isset($filter['group_selected']) ? $filter['group_selected'] : null;
        $data = self::join('group', 'score.group_id', 'group.id')
            ->when(count($group_selected) > 0, function ($query) use ($group_selected) {
                $query->whereIn('score.group_id', $group_selected);
            })
            ->select(
                'score.*',
                'group.name as group',
            )
            ->with([
                'studentScore'
            ]);
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
