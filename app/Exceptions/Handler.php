<?php

namespace App\Exceptions;

use App\Helpers\TelegramBot;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

  public function render($request, Throwable $exception)
  {
    $project_name = env('APP_NAME');
    $error_message = $exception->getMessage();
    $error_file = $exception->getFile();
    $error_line = $exception->getLine();
    $payload = json_encode(Request::except(['image', 'logo', 'product_image']));
    $file_name = explode(DIRECTORY_SEPARATOR, $error_file);

    if ($file_name[count($file_name) - 1] != 'RoutesRequests.php' && $file_name[count($file_name) - 1] !=  'Cors.php'){
      //
      $date = date('d-m-Y H:s');
      $html = "<strong>Project Name: $project_name</strong>"."\n";
      $html .= "<strong>Date: ($date)</strong>"."\n";
      $html .= "<strong>File: $error_file</strong>"."\n";
      $html .= "<strong>Line: $error_line</strong>"."\n";
      $html .= "<code>Message: $error_message</code>"."\n";
      $html .= "<code>Payload: $payload</code>"."\n";
      $html = urlencode($html);

      if ($error_message != 'Unauthenticated.'){
        $bot = \App\Models\TelegramBot::getByAction('error_log');
        $bot_toked = $bot->bot_toked;
        $chat_id = $bot->chat_id;
        $config_url = "https://api.telegram.org/bot$bot_toked/sendMessage?chat_id=$chat_id&text=$html&parse_mode=HTML";
        TelegramBot::sendHtml("$html", $config_url);
      }
      return parent::render($request, $exception);
    }
  }
}
