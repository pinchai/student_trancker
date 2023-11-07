<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\TelegramBot;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use function GuzzleHttp\Promise\all;
use File;

class LoginController extends Controller
{

    public  function employee()
    {
        if (Auth::check()) {
            //return redirect('/welcome');
            return response()->json('hello kon papa');
        } else {
            $data = Branch::first();
            return View('Employee', ['data'=>$data]);
        }
    }
    public  function index(Request $request)
    {
        $intended_url = $request->session()->get('url.intended');
        session()->put('intended_url',$intended_url);
        if (Auth::check()) {
            return redirect('/welcome');
        } else {
            $data = Branch::first();
            return view('Login', ['data'=>$data]);
        }
    }

    public function do_login(Request $request)
    {
        $this->checkValidation($request);
        $credentials = $request->only('name', 'password');
        if (Auth::attempt($credentials)) {
            // Authentication passed...
          if(env('NOTIFY_LOGIN') == 1){
            $project_name = env('APP_NAME');
            $date = date('d-m-Y H:s');
            $user_name = \auth()->user()->name;
            $device = $request->ip();

            $html = "<strong>Project Name: $project_name</strong>"."\n";
            $html .= "<strong>Login Success ✅</strong>"."\n";
            $html .= "<strong>Employee Name: $user_name</strong>"."\n";
            $html .= "<strong>Login IP: $device</strong>"."\n";
            $html .= "<strong>📅 $date</strong>"."\n";
            $html = urlencode($html);
            $bot = \App\Models\TelegramBot::getByAction('hr');
            $bot_toked = $bot->bot_toked;
            $chat_id = $bot->chat_id;
            $config_url = "https://api.telegram.org/bot$bot_toked/sendMessage?chat_id=$chat_id&text=$html&parse_mode=HTML";
            TelegramBot::sendHtml("$html", $config_url);
          }
          return redirect('/welcome');
        } else {
          if(env('NOTIFY_LOGIN') == 1){
            $project_name = env('APP_NAME');
            $date = date('d-m-Y H:s');
            $user_name = $request->input('name');
            $device = $request->ip();

            $html = "<strong>Project Name: $project_name</strong>"."\n";
            $html .= "<strong>Login Failed ❌</strong>"."\n";
            $html .= "<strong>Employee Name: $user_name</strong>"."\n";
            $html .= "<strong>Login IP: $device</strong>"."\n";
            $html .= "<strong>📅 $date</strong>"."\n";
            $html = urlencode($html);
            $bot = \App\Models\TelegramBot::getByAction('hr');
            $bot_toked = $bot->bot_toked;
            $chat_id = $bot->chat_id;
            $config_url = "https://api.telegram.org/bot$bot_toked/sendMessage?chat_id=$chat_id&text=$html&parse_mode=HTML";
            TelegramBot::sendHtml("$html", $config_url);
          }
          return redirect('/login')->with('status', 'Incorrect Username or password !');
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/login');
    }

    //check validation function
    public function checkValidation($data)
    {
        $this->validate($data, [
            'name' => 'required|max:100',
            'password' => 'required|max:100',
        ]);
    }
}
