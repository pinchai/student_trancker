<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  const MODULE_KEY = 'dashboard';

  //dashboard data
  public function get(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
      $response = [
        'total_blog' => 0,
        'total_view' => 0,
        'today_product' => 0,
        'today_employee' => 0,
      ];
      return $this->responseWithData($response);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }
//
}
