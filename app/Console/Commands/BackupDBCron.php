<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class BackupDBCron extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'backup_db:cron';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Command description';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    ini_set('memory_limit', '-1');

    $project_name = env('APP_NAME');
    $database_name = $project_name . ".sql";
    //Call Script
    Artisan::call("db:masked-dump $database_name");
    $filePath = base_path($database_name);

    //    $filename = $project_name."-backup-" . Carbon::now()->format('Y-m-d') . ".gz";
    //    $filePath = base_path() . "/" . $filename;
    //    $command = "mysqldump --user " . env('DB_USERNAME') . " --password " . env('DB_PASSWORD') . " " . env('DB_DATABASE') . "  | gzip > " . $filePath;
    //    info($command);

    $command = "gzip -v $database_name";
    $returnVar = NULL;
    $output = NULL;
    exec($command, $output, $returnVar);
    info($filePath.".gz");

    $date = date('Y-m-d H:i:s');
    $keyboard = json_encode([
      "inline_keyboard" => [
        [
          [
            "text" => "⚙",
            "callback_data" => "1",
            "url" => 'https://api.telegram.org'
          ]
        ],
        [
          [
            "text" => "📆 $date",
            "callback_data" => "2"
          ]
        ]
      ],
    ]);

    $html = "<b>$project_name</b>";
    $html .= "<b>$date</b>";

    $bot = \App\Models\TelegramBot::getByAction('db_backup');
    if ($bot) {
      $bot_toked = $bot->bot_toked;
      $chat_id = $bot->chat_id;
    }
    $url = "https://api.telegram.org/bot$bot_toked/sendDocument?chat_id=$chat_id";
    $post_fields = array(
      'document' => new \CURLFile($filePath.".gz"),
      'caption' => $html,
      'parse_mode' => 'HTML',
      'reply_markup' => $keyboard
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      "Content-Type:multipart/form-data"
    ));
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
    $output = curl_exec($ch);

    //Delete file backup after send to telegram
    File::delete($filePath.".gz");

    //delete logs
    DB::table('logs')->delete();
    return 0;
  }
}
