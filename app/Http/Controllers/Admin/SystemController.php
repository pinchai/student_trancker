<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\StringHelper;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\CustomUserModulePermission;
use App\Models\Enum;
use App\Models\Module;
use App\Models\RolePermission;
use App\Models\Setting;
use App\Models\UserType;
use Illuminate\Http\Request;

class SystemController extends Controller
{

  //init data to VueX
  public function getIntoVueX()
  {
    //Set first menu redirect
    $firstMenu = "";
    if (UserType::isDev()) {
      $firstMenu = "dashboard";
    } else {
      $role_permission = RolePermission::getRolePermissionLists(auth()->user()->role_id);
      if (!empty($role_permission)) {
        $firstMenu = $role_permission[0]->module_key;
      }
    }
    $response = [
      'data' => [
        'first_menu' => $firstMenu,
        'enums' => Enum::getLists(),
        'module_permission' => Module::lists()->orderBy('sequence')->get(),
        'custom_user_module_permission' => CustomUserModulePermission::lists()->get(),
        'default_table_size' => Setting::getSettingValueByKey('default_table_size'),
        'default_sale_status' => Setting::getSettingValueByKey('sale_status'),
        'version' => env('VERSION')
      ],
      'success' => 1,
      'message' => 'Your action has been completed successfully.',
    ];
    return response()->json($response, 200);
  }

  public function uploadMedia(Request $request)
  {
    $image = StringHelper::uploadImage($request->input('image'), 'media');
    return $this->responseWithData($image);
  }
}
