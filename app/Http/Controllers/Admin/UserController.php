<?php

namespace App\Http\Controllers\Admin;

use App\Enums\IsHasThumbnail;
use App\Helpers\StringHelper;
use App\Http\Controllers\Controller;
use App\Models\Session;
use App\Models\CustomUserModulePermission;
use App\Models\Permission;
use App\Models\RolePermission;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  const MODULE_KEY = 'user_list';

  public function get(Request $request)
  {
    $table_size = User::count();
    $data = $this->lists($table_size);
    foreach($data->items() as $item){
      $item->bot_toked = \App\Models\TelegramBot::getByAction('hr')->bot_toked ?? null;
    }
    return response()->json($data);
  }

  function lists($table_size)
  {
    return User::join('user_type', 'user_type.id', 'users.user_type_id')
      ->join('role', 'role.id', 'users.role_id')
      ->join('branch', 'branch.id', 'users.branch_id')
      ->where('user_type.level', '<=', UserType::userAuthLevel())
      ->where('users.user_type_id', '!=', 1)
      ->select(
        'users.*',
        'users.id as id',
        'branch.id as branch_id',
        'branch.name as branch_name',
        'role.id as role_id',
        'role.name as role_name',
      )
      ->orderBy('users.id', 'desc')
      ->paginate($table_size);
  }

  public function getForBackup(Request $request)
  {
    $table_size = $request->input('table_size');
    $table_size = User::count();

    $data = $this->listsForBackup($table_size);
    return response()->json($data);
  }

  function listsForBackup($table_size)
  {
    return User::join('user_type', 'user_type.id', 'users.user_type_id')
      ->join('branch', 'branch.id', 'users.branch_id')
      ->join('position', 'position.id', 'users.position_id')
      ->leftjoin('users as leader', 'leader.id', 'users.leader_id')
      ->where('user_type.level', '<=', UserType::userAuthLevel())
      ->select(
        'users.*',
        'users.id as id',
        'leader.name as leader_name',
        'branch.id as branch_id',
        'branch.name as branch_name',
        'position.name as position_name',
      )
      ->orderBy('users.id', 'desc')
      ->paginate($table_size);
  }

  public function store(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getCreatePermission())) {
      DB::beginTransaction();
      $user = new User();
      $user->setData($request);
      if ($user->save()) {
        // Upload image
        if ($request->input('image') != null) {
          $image = StringHelper::uploadImage($request->input('image'), 'user', IsHasThumbnail::getYes());
          $user->image = $image;
          $user->save();
        }

        //insert new custom_module_permission
        foreach ($request->custom_module_permission as $custom){
          if (!empty($custom['selected_custom_permission'])){
            $custom_user_module_permission_data = [
              'user_id'=>$user->id,
              'module_id'=>$custom['id'],
              'custom_permission'=>implode(",", $custom['selected_custom_permission']),
            ];
            $custom_user_module_permission = new CustomUserModulePermission();
            $custom_user_module_permission->setData($custom_user_module_permission_data);
            $custom_user_module_permission->save();
          }
        }
      }
      DB::commit();
      return response()->json([
        'data' => $user,
        'status' => 'success'
      ]);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  public function edit(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getUpdatePermission())) {
      DB::beginTransaction();
      $user = User::find($request->id);
      if ($user) {
        //delete all custom_module_permission
        $custom_user_module_permission = CustomUserModulePermission::where('user_id', $request->id)
          ->forceDelete();
        foreach ($request->custom_module_permission as $custom){
          if (!empty($custom['selected_custom_permission'])){
            $custom_user_module_permission_data = [
              'user_id'=>$request->id,
              'module_id'=>$custom['id'],
              'custom_permission'=>implode(",", $custom['selected_custom_permission']),
            ];
            $custom_user_module_permission = new CustomUserModulePermission();
            $custom_user_module_permission->setData($custom_user_module_permission_data);
            $custom_user_module_permission->save();
          }
        }
        $user_data = [];
        if (!empty($request->password)) {
          $user_data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'branch_id' => $request->branch_id,
            'role_id' => $request->role_id,
            'user_type_id' => $request->user_type_id,
            'status' => 1
          ];
        } else {
          $user_data = [
            'name' => $request->name,
            'email' => $request->email,
            'branch_id' => $request->branch_id,
            'role_id' => $request->role_id,
            'user_type_id' => $request->user_type_id,
            'status' => 1
          ];
        }
        $user->setData($user_data);
        if ($user->save()) {
          //edit image
          $image = StringHelper::editImage($request['image'], $request['old_image'], 'user', IsHasThumbnail::getYes());
          $user->image = $image;
          $user->save();
        }
      }
      DB::commit();
      return response()->json(['data' => $user, 'status' => 'success']);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  public function delete(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getDeletePermission())) {
      DB::beginTransaction();
      $user = User::find($request->id);
      if ($user->delete()) {
        //Delete Image
        StringHelper::deleteImage($request->input('image'), 'user', IsHasThumbnail::getYes());
      }
      $data = $this->lists($request->input('table_size'));
      DB::commit();
      return response()->json($data);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  public function getUserPermissionData()
  {
    $user = User::join('user_type', 'user_type.id', 'users.user_type_id')
      ->join('branch', 'branch.id', 'users.branch_id')
      ->where('users.id', auth()->user()->id)
      ->select(
        'users.*',
        'users.id as is',
        'user_type.type as user_type_name',
        'branch.name as branch_name',
      )
      ->first();

    $response = [
      'data' => [
        'user' => $user,
        'auth_level' => UserType::userAuthLevel(),
        'role_permission' => RolePermission::getRolePermissionLists(auth()->user()->role_id),
      ],
      'success' => 1,
      'message' => 'Your action has been completed successfully.',
    ];
    return response()->json($response, 200);
  }

  public function updateProfile(Request $request)
  {
    //Check validation
    $this->validate($request, [
      'id' => 'exists:users,id',
      'name' => 'required|max:20',
      'email' => 'required|email',
    ]);
    //Update data
    $user = User::find($request->input('id'));
    if ($user) {
      //Update password if have
      if (!empty($request->input('new_password'))) {
        $user->password = Hash::make($request->input('new_password'));
      }
      $user->name = $request->input('name');
      $user->email = $request->input('email');
      $image = StringHelper::editImage(
        $request->input('image'),
        $request->input('old_image'),
        User::logoPath,
        IsHasThumbnail::YES['id']
      );
      //StringHelper::editImage('','','','','')
      $user->image = $image;
      //dd($user);
      $user->save();
    }

    //Response Data
    $data = User::join('user_type', 'user_type.id', 'users.user_type_id')
      ->join('branch', 'branch.id', 'users.branch_id')
      ->where('users.id', $request->input('id'))
      ->select(
        'users.*',
        'users.id as is',
        'user_type.type as user_type_name',
        'branch.name as branch_name',
      )
      ->first();
    return response()->json(['data' => $data, 'status' => 'success']);
  }
}
