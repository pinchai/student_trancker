<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Support\Facades\DB;

class Attendance extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'attendance';
    const ID = 'id';
    const CLASSING_ID = 'classing_id';
    const STUDENT_ID = 'student_id';
    const CHECKED = 'checked';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::orderBy('id', 'desc')
        ->select('*');
    }

    public function setData($data)
    {
        $this->{self::CLASSING_ID} = $data[self::CLASSING_ID];
        $this->{self::STUDENT_ID} = $data[self::STUDENT_ID];
        $this->{self::CHECKED} = $data[self::CHECKED];
    }

    public static function getAttendanceByStudentID($student_id){
        $data = Attendance::where('student_id', $student_id)
            ->select(
                'attendance.*',
                DB::raw("SUM(IF(checked = '0', 1, NULL)) AS total_absent"),
                DB::raw("SUM(IF(checked = '1', 1, NULL)) AS total_present")
            )
            ->groupBy('student_id')
            ->first();
        return $data;
    }

}
