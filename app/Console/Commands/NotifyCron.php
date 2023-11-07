<?php

namespace App\Console\Commands;

use App\Helpers\TelegramBot;
use Illuminate\Console\Command;

class NotifyCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:cron';

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
    public function handle(){
        $date = date('d-m-Y');
        $html = "<strong>របាយការណ៍ប្រចាំថ្ងៃ($date)</strong>"."\n";
        $html .= "<code>សរុបវិក្កយបត្រ: 1,000</code>"."\n";
        $html .= "<code>សរុបប្រាក់លក់បាន: 1,000$</code>"."\n";
        $html .= "<code>សរុបប្រាក់ទទួលជាក់ស្តែង: 500$</code>"."\n";
        $html .= "<code>សរុបប្រាក់ជំពាក់: 300$</code>"."\n";
        $html .= "<code>សរុបប្រាក់លើស: 10$</code>"."\n";
        $html = urlencode($html);
        $bot = \App\Models\TelegramBot::getByAction('daily_report');
        if ($bot){
          $bot_toked = $bot->bot_toked;
          $chat_id = $bot->chat_id;
        }
        $config_url = "https://api.telegram.org/bot$bot_toked/sendMessage?chat_id=$chat_id&text=$html&parse_mode=HTML";
        TelegramBot::sendHtml("$html", $config_url);
        return 0;
    }
}
