<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentViewController extends Controller
{
    public function index(Request $request)
    {
        $group_name = $request->input('group_name');
        if (strlen($group_name) > 10) {
            return view('errors.404');
        } else {
            $data = Student::listsByGroup($request)->get();
            foreach ($data as $item) {
                $total_absent = 0;
                $total_present = 0;
                $total_score = 0;
                foreach ($item->attendance as $row) {
                    if ($row->checked == 0) {
                        $total_absent++;
                    }
                    if ($row->checked == 1) {
                        $total_present++;
                    }
                }

                foreach ($item->score as $row) {
                    $total_score += $row->score;
                }
                $item->total_absent = $total_absent;
                $item->total_present = $total_present;
                $item->total_score = $total_score;
            }
            return view('StudentView', ['data' => $data, 'group'=>$group_name]);
        }
    }
}
