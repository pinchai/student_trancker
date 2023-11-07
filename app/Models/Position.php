<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class Position extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'position';
    const ID = 'id';
    const NAME = 'name';
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
        $this->{self::NAME} = $data[self::NAME];
        $this->{self::REMARK} = $data[self::REMARK];
    }
}
