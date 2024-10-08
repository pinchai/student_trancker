<?php

namespace App\Models;

use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;

class Student extends Model
{

    protected $table = 'student';
    use Loggable;
    use HasFactory, SoftDeletes;

    const logoPath = 'images' . DIRECTORY_SEPARATOR . 'student';
    const thumbnailPath = 'images' . DIRECTORY_SEPARATOR . 'student' . DIRECTORY_SEPARATOR . 'thumbnail';

    public function setData($data)
    {
        $this->name = $data['name'];
        $this->latin_name = $data['latin_name'];
        $this->group_id = $data['group_id'];
        $this->status = $data['status'];
        $this->phone = $data['phone'] == 'null' ? null : $data['phone'];
        $this->address = $data['address'] == 'null' ? null : $data['address'];;
        $this->position_id = $data['position_id'];
        $this->gender = $data['gender'];
        $this->description = $data['description'];
    }

    public static function lists($request){
        $filter = $request->input('filter');
        $group_selected = isset($filter['group_selected']) ? $filter['group_selected'] : null;
        $data = Student::join('group', 'student.group_id', 'group.id')
            ->with([
                'attendance',
                'score',
                'requestPermission'
            ])
            ->when(count($group_selected) > 0, function ($query) use ($group_selected) {
                $query->whereIn('group.id', $group_selected);
            })
            ->where('student.user_id', auth()->user()->id)
            ->select(
                'student.*',
                'group.name as group',
            )
            ->orderBy('group.id', 'DESC')
            ->orderBy('student.latin_name', 'ASC');

        return $data;
    }

    public function attendance()
    {
        return $this->hasMany('App\Models\Attendance', 'student_id', 'id')
            ->join('classing','attendance.classing_id', 'classing.id')
            ->select(
                'attendance.*',
                'classing.date_time as classing_date'
            );
    }

    public function requestPermission()
    {
        return $this->hasMany('App\Models\RequestPermission', 'student_id', 'id')
            ->select(
                '*'
            );
    }

    public function score()
    {
        return $this->hasMany('App\Models\StudentScore', 'student_id', 'id')
            ->join('score','student_score.score_id', 'score.id')
            ->select(
                'student_score.*',
                'score.score_type as score_type',
                'score.total_score as lab_total_score',
                'score.remark as remark',
            );
    }

    public static function listsByGroup($request){
        $group_name = $request->input('group_name');
        $data = Student::join('group', 'student.group_id', 'group.id')
            ->where('group.name', $group_name)
            ->with([
                'attendance',
                'score',
                'requestPermission'
            ])
            ->select(
                'student.*',
                'group.name as group',
            )
            ->orderBy('group.id', 'DESC')
            ->orderBy('student.latin_name', 'ASC');
        return $data;
    }

    public static function getDetailByID($id){
        $data = Student::join('group', 'student.group_id', 'group.id')
            ->join('position', 'student.position_id', 'position.id')
            ->with([
                'attendance',
                'score',
                'requestPermission'
            ])
            ->where('student.id', $id)
            ->select(
                'student.*',
                'position.name as position',
                'group.name as group_name',
            )
            ->first();

        return $data;
    }

}
