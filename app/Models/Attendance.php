<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class Attendance extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'attendance';
    const ID = 'id';
    const SESSION_ID = 'session_id';
    const STUDENT_ID = 'student_id';
    const CHECKED = 'checked';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::orderBy('id', 'desc')
        ->select('*');
    }

    public function setData($data)
    {
        $this->{self::SESSION_ID} = $data[self::SESSION_ID];
        $this->{self::STUDENT_ID} = $data[self::STUDENT_ID];
        $this->{self::CHECKED} = $data[self::CHECKED];
    }

}
