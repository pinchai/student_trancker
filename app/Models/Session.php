<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Log;

class Session extends Model
{

    protected $table = 'session';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'session';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'session' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->group_id = $data['group_id'];
        $this->section_id = $data['section_id'];
        $this->date_time = $data['date_time'];
        $this->remark = $data['remark'] == 'null' ? null : $data['remark'];
    }

    public static function getList(Request $request)
    {
        $data = Session::join('group', 'session.group_id', 'group.id')
            ->join('section', 'session.section_id', 'section.id')
            ->select(
                'session.*',
                'group.name as group',
                'section.name as section',
            )
            ->groupBy('section.id')
            ->with([
                'attendance'
            ]);
        return $data;
    }

    public function attendance()
    {
        return $this->hasMany('App\Models\Attendance', 'session_id', 'id')
            ->join('student', 'attendance.student_id', 'student.id')
            ->select(
                'attendance.*',
                'student.name',
                'student.latin_name',
            );
    }

}
