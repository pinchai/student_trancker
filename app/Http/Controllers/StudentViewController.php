<?php

namespace App\Http\Controllers;

use App\Helpers\TelegramBot;
use App\Models\RequestPermission;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StudentViewController extends Controller
{
    public function index(Request $request)
    {
        $group_name = $request->input('group_name');
        if (strlen($group_name) > 10 && false) {
            return view('errors.404');
        } else {
            $data = Student::listsByGroup($request)->get();
            foreach ($data as $item) {
                $total_absent = 0;
                $total_present = 0;
                $total_score = 0;
                $total_permission = 0;
                foreach ($item->attendance as $row) {
                    if ($row->checked == 0) {
                        $total_absent++;
                    }
                    if ($row->checked == 1) {
                        $total_present++;
                    }
                    if ($row->checked == 2) {
                        $total_permission++;
                    }

                }

                foreach ($item->score as $row) {
                    $total_score += $row->score;
                }
                $item->total_absent = $total_absent;
                $item->total_present = $total_present;
                $item->total_permission = $total_permission;
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
        DB::beginTransaction();
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

        $date = date('d-m-Y H:s');
        $device = $request->ip();

        $html = "<strong>🛡️ Group: $student->group_name</strong>"."\n";
        $html .= "<strong>🐣 Name: $student->name</strong>"."\n";
        $html .= "<strong>🐥 Latin Name: $student->latin_name</strong>"."\n";
        $html .= "<strong>----------</strong>"."\n";
        $html .= "<strong>📅 Permission Date: $request->date</strong>"."\n";
        $html .= "<strong>⚔️ Reason: $request->reason</strong>"."\n";
        $html .= "<strong>🌏 Referent Url: $request->referent_url</strong>"."\n";
        $html .= "<strong>📱 IP Address: $device</strong>"."\n";
        $html .= "<strong>Created At: $date</strong>"."\n";

        $html = urlencode($html);
        $bot_toked = '7392836561:AAHl9_dT8GJs_903O4PmCca78RU6QM8wNaA';
        $chat_id = '756357473';
        $config_url = "https://api.telegram.org/bot$bot_toked/sendMessage?chat_id=$chat_id&text=$html&parse_mode=HTML";
        TelegramBot::sendHtml("$html", $config_url);

        DB::commit();
        return redirect($url)->with('status','Your permission has been applies 🍻🍾🥜');
    }
}
