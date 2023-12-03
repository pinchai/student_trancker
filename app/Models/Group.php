<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class Group extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'group';
    const ID = 'id';
    const NAME = 'name';
    const REMARK = 'remark';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::orderBy('id', 'desc')
            ->with([
                'section'
            ])
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

    public function section()
    {
        return $this->hasMany('App\Models\Section', 'group_id', 'id')
            ->select('*');
    }

}
