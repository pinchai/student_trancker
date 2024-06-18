<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classing;
use App\Models\Group;
use App\Models\Permission;
use App\Models\Student;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    const MODULE_KEY = 'dashboard';

    //dashboard data
    public function get(Request $request)
    {
        if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
            $response = [
                'total_group' => Group::where('user_id', auth()->user()->id)->count(),
                'total_student' => Student::where('user_id', auth()->user()->id)->count(),
                'total_classing' => Classing::join('group', 'classing.group_id', 'group.id')
                    ->where('group.user_id', auth()->user()->id)
                    ->whereMonth('classing.date_time', date('m'))
                    ->count(),
                'total_student_view' => 0,
                'total_student_by_group' => Group::countStudent(),
                'student'=>Student::getDetailByID(1233)
            ];
            return $this->responseWithData($response);
        } else {
            return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
        }
    }
//
}
