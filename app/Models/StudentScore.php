<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class StudentScore extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'student_score';
    const ID = 'id';
    const STUDENT_ID = 'student_id';
    const SCORE_ID = 'score_id';
    const SCORE = 'score';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::orderBy('id', 'desc')
        ->select('*');
    }

    public function setData($data)
    {
        $this->{self::STUDENT_ID} = $data[self::STUDENT_ID];
        $this->{self::SCORE_ID} = $data[self::SCORE_ID];
        $this->{self::SCORE} = $data[self::SCORE];
    }

}
