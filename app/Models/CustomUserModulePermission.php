<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class CustomUserModulePermission extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'custom_user_module_permission';
    const ID = 'id';
    const USER_ID = 'user_id';
    const MODULE_ID = 'module_id';
    const CUSTOM_PERMISSION = 'custom_permission';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::where('user_id', auth()->user()->id)
            ->join('module', 'custom_user_module_permission.module_id', 'module.id')
//            ->with([
//                'customPermission'
//            ])
            ->orderBy('custom_user_module_permission.id', 'desc')
            ->select(
                'custom_user_module_permission.*',
                'module_key as module_key',
            );
    }

    public function setData($data)
    {
        $this->{self::USER_ID} = $data[self::USER_ID];
        $this->{self::MODULE_ID} = $data[self::MODULE_ID];
        $this->{self::CUSTOM_PERMISSION} = $data[self::CUSTOM_PERMISSION];
    }

    public function customPermission()
    {
        return $this->hasMany('App\Models\CustomPermission', 'custom_user_module_permission_id', 'id')
            ->select('*');
    }

    //
}
