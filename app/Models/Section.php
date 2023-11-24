<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class Section extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'section';
    const ID = 'id';
    const GROUP_ID = 'group_id';
    const NAME = 'name';
    const START_TIME = 'start_time';
    const END_TIME = 'end_time';
    const REMARK = 'remark';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::orderBy('id', 'desc')
        ->select('*');
    }

    public static function comboList(){
        return self::orderBy('id', 'desc')->get();
    }

    public function setData($data)
    {
        $this->{self::GROUP_ID} = $data[self::GROUP_ID];
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::START_TIME} = $data[self::START_TIME];
        $this->{self::END_TIME} = $data[self::END_TIME];
        $this->{self::REMARK} = $data[self::REMARK];
    }
}
