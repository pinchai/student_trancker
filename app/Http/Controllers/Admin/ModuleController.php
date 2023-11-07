<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Permission;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
  const MODULE_KEY = 'module';

  //lists
  public function get(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
      $data = Module::getList();
      return $this->responseWithData($data);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }
}
