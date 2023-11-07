<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class CustomPermission extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'custom_permission';
    const ID = 'id';
    const CUSTOM_USER_MODULE_PERMISSION_ID = 'custom_user_module_permission_id';
    const PERMISSION = 'permission';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public function setData($data)
    {
        $this->{self::CUSTOM_USER_MODULE_PERMISSION_ID} = $data[self::CUSTOM_USER_MODULE_PERMISSION_ID];
        $this->{self::PERMISSION} = $data[self::PERMISSION];
    }
}
