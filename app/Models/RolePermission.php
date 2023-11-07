<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\Permission;

class RolePermission extends Model
{

    const TABLE_NAME = 'role_permission';
    const ID = 'id';
    const ROLE_ID = 'role_id';
    const PERMISSION_ID = 'permission_id';
    const MODULE_ID = 'module_id';

    protected $table = self::TABLE_NAME;

    /**
     * get role with permission by role id (Click Edit User Role)
     *
     * @param [type] $roleId
     * @return void
     */
    public static function getRolePermissionById($roleId)
    {
        $data = self::select('role_id', 'module_id', 'module.module_key', 'permission_id')
            ->join('module', 'module.id', 'role_permission.module_id')
            ->where('role_id', $roleId)
            ->get();
        return $data;
    }

    /**
     * get role permission
     *
     * @param [type] $roleId
     * @return void
     */
    public static function getRolePermissionLists($roleId)
    {
        $permission = new Permission();
        $data = RolePermission::join('module', 'module.id', 'role_permission.module_id')
            ->where('role_permission.role_id', $roleId)
            ->groupBy('module.module_key', 'module.featured')
            ->select(
                'module.module_key',
                'module.featured',
                'role_permission.permission_id',
                DB::raw('group_concat(case when role_permission.permission_id = ' . $permission->getCreatePermission() . ' then role_permission.permission_id else null end) \'create\''),
                DB::raw('group_concat(case when role_permission.permission_id = ' . $permission->getUpdatePermission() . ' then role_permission.permission_id else null end) \'update\''),
                DB::raw('group_concat(case when role_permission.permission_id = ' . $permission->getDeletePermission() . ' then role_permission.permission_id else null end) \'delete\''),
                DB::raw('group_concat(case when role_permission.permission_id = ' . $permission->getViewPermission() . ' then role_permission.permission_id else null end) \'view\'')
            )
            ->orderBy('module.sequence')
            ->get();

        return $data;
    }

    //set data
    public function setData($data)
    {
        $this->{self::ROLE_ID} = $data[self::ROLE_ID];
        $this->{self::PERMISSION_ID} = $data[self::PERMISSION_ID];
        $this->{self::MODULE_ID} = $data[self::MODULE_ID];
    }
}
