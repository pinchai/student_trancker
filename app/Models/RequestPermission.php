<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;
use Illuminate\Support\Facades\DB;

class RequestPermission extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'request_permission';
    const ID = 'id';
    const STUDENT_ID = 'student_id';
    const DATE = 'date';
    const REASON = 'reason';
    const REFERENT_URL = 'referent_url';

    protected $table = self::TABLE_NAME;

    public static function lists()
    {
        return self::select('*');
    }

    public static function comboList()
    {
        return self::orderBy('id', 'desc')->get();
    }

    public function setData($data)
    {
        $this->{self::STUDENT_ID} = $data[self::STUDENT_ID];
        $this->{self::DATE} = $data[self::DATE];
        $this->{self::REASON} = $data[self::REASON];
        $this->{self::REFERENT_URL} = $data[self::REFERENT_URL];
    }


    public static function getRequestPermissionByStudentID($student_id, $date){
        $data = RequestPermission::where('student_id', $student_id)
            ->where(DB::raw("DATE(date) = '".$date."'"))
            ->select('*')
            ->first();
        return $data;
    }

}
