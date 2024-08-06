<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Log;

class Classing extends Model
{

    protected $table = 'classing';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'classing';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'classing' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->group_id = $data['group_id'];
        $this->section_id = $data['section_id'];
        $this->classing_type = $data['classing_type'];
        $this->date_time = $data['date_time'];
        $this->remark = $data['remark'] == 'null' ? null : $data['remark'];
    }

    public static function getList(Request $request)
    {
        $filter = $request->filter;
        $group_selected = isset($filter['group_selected']) ? $filter['group_selected'] : null;
        $classing_type = isset($filter['classing_type']) ? $filter['classing_type'] : null;
        $data = Classing::join('group', 'classing.group_id', 'group.id')
            ->join('section', 'classing.section_id', 'section.id')
            ->when(count($group_selected) > 0, function ($query) use ($group_selected) {
                $query->whereIn('classing.group_id', $group_selected);
            })
            ->when(count($classing_type) > 0, function ($query) use ($classing_type) {
                $query->whereIn('classing.classing_type', $classing_type);
            })
            ->where('group.user_id', auth()->user()->id)
            ->select(
                'classing.*',
                'group.name as group',
                'section.name as section',
            )
            //->groupBy('section.id')
            ->orderBy('classing.id', 'DESC')
            ->with([
                'attendance'
            ]);
        return $data;
    }

    public function attendance()
    {
        return $this->hasMany('App\Models\Attendance', 'classing_id', 'id')
            ->join('student', 'attendance.student_id', 'student.id')
            ->select(
                'attendance.*',
                'student.name',
                'student.latin_name',
            )
            ->orderBy('student.latin_name', 'ASC');
    }

}
