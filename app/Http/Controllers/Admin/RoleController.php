<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\CustomUserModulePermission;
use App\Models\Module;
use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\User;
use App\Models\UserType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    const MODULE_KEY = 'user_role';

    public function get(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())){
            $table_size = $request->input('table_size');
            if (empty($table_size)) {
                $table_size = 10;
            }

            $data = Role::lists()->orderBy('role.id', 'desc')->paginate($table_size);

            return $this->responseWithPagination($data);
        }else{
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    /**
     * Store Role Module
     */
    public function store(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getCreatePermission())) {
            $this->checkValidation($request);

            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;
            $rolePermission = $request->input('role_permission');

            DB::beginTransaction();
            $role = new Role();
            $role->setData($request);
            if ($role->save()) {
                foreach ($rolePermission as $obj) {
                    $role_permission_data = [
                        RolePermission::ROLE_ID => $role->id,
                        RolePermission::MODULE_ID => $obj['module_id'],
                        RolePermission::PERMISSION_ID => $obj['permission_id'],
                    ];

                    $role_permission = new RolePermission();
                    $role_permission->setData($role_permission_data);
                    $role_permission->save();
                }
            }
            DB::commit();
            $data = Role::lists()->paginate($table_size);
            return $this->responseWithData($data);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }
    /**
     * Check Validation
     */
    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required|max:191',
            'user_type_id' => 'required|exists:user_type,id',
            'description' => 'max:191'
        ]);
    }

    /**
     * Get Edit Role Data
     */
    public function getUpdate(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getUpdatePermission())) {

            $roleId = $request->input('role_id');
            $data = [
                'role_permission' => RolePermission::getRolePermissionById($roleId)
            ];
            return $this->responseWithData($data);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    /**
     * Update role permission
     *
     * @param Request $request
     * @return void
     */
    public function edit(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getUpdatePermission())) {
            $this->checkValidation($request);

            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;
            $rolePermission = $request['role_permission'];

            DB::beginTransaction();
            $role = Role::find($request['id']);
            $role->setData($request);
            if ($role->save()) {
                if (RolePermission::where(RolePermission::ROLE_ID,$role->id)->delete()) {
                    foreach ($rolePermission as $obj) {
                        $role_permission_data = [
                            RolePermission::ROLE_ID => $role->id,
                            RolePermission::MODULE_ID => $obj['module_id'],
                            RolePermission::PERMISSION_ID => $obj['permission_id'],
                        ];

                        $role_permission = new RolePermission();
                        $role_permission->setData($role_permission_data);
                        $role_permission->save();
                    }
                }

                $user = DB::table('users')->where('role_id', $request->input('id'));
                if(!empty($user)){
                    $user->Update([
                        'role_id' => $role->id,
                        'user_type_id' => $request->input('user_type_id'),
                        'updated_at' => Carbon::now()
                    ]);
                }
            }
            DB::commit();
            $data = Role::lists()->paginate($table_size);
            return $this->responseWithData($data);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    /**
     * Delete role
     *
     * @param Request $request
     * @return void
     */
    public function delete(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getDeletePermission())) {

            $this->validate($request, [
                'role_id' => 'required'
            ]);

            $table_size = isset($request['table_size']) ? $request['table_size'] : 10;
            $roleId = $request->input('role_id');

            DB::beginTransaction();

            RolePermission::where('role_id', $roleId)->delete();
            Role::where('id', $roleId)->delete();

            DB::commit();
            $data =Role::lists()->paginate($table_size);
            return $this->responseWithData($data);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }

    //get filter role by user type
    public function getByUserType(Request $request){
        $this->validate($request, [
            'user_type_id' => 'required'
        ]);

        $userTypeId = $request->input('user_type_id');
        $user_id = $request->input('user_id');
        $data = Role::getByUserType($userTypeId);
        $custom_module_permission = Module::whereNotNull('custom_permission')->get();
        foreach ($custom_module_permission as $item){
          $custom_user_module_permission = CustomUserModulePermission::where('user_id', $user_id)
            ->where('module_id', $item->id)
            ->first();
          if ($custom_user_module_permission){
            $item->selected_custom_permission = explode(",", $custom_user_module_permission->custom_permission);
          }
        }

        return response()->json([
          'data' => $data,
          'custom_module_permission' => $custom_module_permission,
          'success' => 1,
          'message' => 'done'
        ], 200);
    }
}
