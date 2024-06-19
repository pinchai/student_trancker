<?php

namespace App\Http\Controllers;

use App\Models\RequestPermission;
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

    public function request_permission(Request $request)
    {
        $id = intval($request->query('id'));
        $student = Student::getDetailByID($id);
        return view('RequestPermission', ['student' => $student]);
    }

    public function submit_permission(Request $request){
        $validated = $request->validate([
            'date' => ['required'],
            'reason' => ['required'],
            'student_id' => ['required'],
        ]);
        $rq = new RequestPermission();
        $rq->date = $request->date;
        $rq->student_id = $request->student_id;
        $rq->reason = $request->reason;
        $rq->referent_url = $request->referent_url;
        $rq->save();

        $student = Student::getDetailByID($rq->student_id);
        $url = 'request_permission?id='.$rq->student_id;
        return redirect($url)->with('status','Your permission has been applies 🍻🍾🥜');
    }
}
