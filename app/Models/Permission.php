<?php

namespace App\Models;

use App\Models\Module;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Permission extends Model
{
    //
    protected $table = 'permission';

    const CREATE = 1;
    const UPDATE = 2;
    const DELETE = 3;
    const VIEW = 4;

    public static function getCreatePermission()
    {
        return self::CREATE;
    }
    public static function getUpdatePermission()
    {
        return self::UPDATE;
    }
    public static function getDeletePermission()
    {
        return self::DELETE;
    }
    public static function getViewPermission()
    {
        return self::VIEW;
    }
    public static function getCreatePermissionName()
    {
        return 'create';
    }
    public static function getUpdatePermissionName()
    {
        return 'update';
    }
    public static function getDeletePermissionName()
    {
        return 'delete';
    }

    public static function authorize($module = null, $action = null)
    {
        $isDev = UserType::isDev();
        if ($isDev) {
            return true;
        } else {
            $check_role = Role::byPK(auth()->user()->role_id); //Check if User have Role
            if ($check_role) {
                $module = Module::byAttributed($module); //Check if User have Role
                if (!empty($module)) {
                    $permission = DB::table('role_permission')
                        ->where('role_id', auth()->user()->role_id)
                        ->where('module_id', $module->id)
                        ->where('permission_id', $action)
                        ->first();
                    if ($permission) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
