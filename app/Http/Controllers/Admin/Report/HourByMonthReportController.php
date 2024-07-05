<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;



class HourByMonthReportController extends Controller
{
    const MODULE_KEY = 'hour_by_month';

    public function get(Request $request)
    {
        $data = Group::countTime($request->filter);
        return $this->responseWithData($data);
    }

    //
}
