<?php

namespace App\Http\Controllers\Admin\Report;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;



class HourByMonthReportController extends Controller
{
    const MODULE_KEY = 'report';

    public function get(Request $request)
    {
        $data = [
            'teaching'=>Group::countTime($request->filter),
            'exam'=>Group::countExamTime($request->filter),
        ];
        return $this->responseWithData($data);
    }

    //
}
