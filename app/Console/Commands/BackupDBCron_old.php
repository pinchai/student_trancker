<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class BackupDBCronOld extends Command
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

        $chat_id = '@KAKKHOD';
        $bot_id = '5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ';
        $bot_url = "https://api.telegram.org/bot5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ/";
        $keyboard = json_encode([
            "inline_keyboard" => [
                [
                    [
                        "text" => "Open",
                        "callback_data" => "1",
                        "url" => 'https://api.telegram.org'
                    ],
                    [
                        "text" => "Button 2",
                        "callback_data" => "2"
                    ]
                ]
            ],
            "ReplyKeyboardMarkup" => [
                'keyboard' => [1, 2, 3],
                'resize_keyboard' => true,
                'one_time_keyboard' => true
            ]
        ]);

        $date = date('Y-m-d H:i:s');
        $html = "<b>Database backup</b>
        <code>$date</code>
        <a href='http://laravue.phama-tech.com/'>Laravue app</a>
        <code>Power By Laravue Team</code>
        ";


        //======================================= sample sendMessage ===========================================/
        //$url = "https://api.telegram.org/bot5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ/sendMessage?chat_id=@KAKKHOD&text=$html&parse_mode=HTML";
        //$response = Http::get($url);
        //======================================= end sample sendMessage ===========================================/


        //======================================= sendImage ===========================================/
        // $url = $bot_url . "sendPhoto?chat_id=" . $chat_id ;
        // $post_fields = array(
        //     'chat_id' => $chat_id,
        //     'photo' => 'https://laravelnews.imgix.net/images/laravel9.png?ixlib=php-3.3.1',
        //     'caption' => $html,
        //     'parse_mode'=> 'HTML'
        // );

        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        //     "Content-Type:multipart/form-data"
        // ));
        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        // $output = curl_exec($ch);

        //======================================= end sendImage ===========================================/


        //======================================= sendFile ===========================================/
        Artisan::call('db:masked-dump output.sql');

        $url = $bot_url . "sendDocument?chat_id=" . $chat_id . "&reply_markup={$keyboard}";
        $filepath = base_path('output.sql');
        $post_fields = array(
            'chat_id' => $chat_id,
            'document' => new \CURLFile($filepath),
            'caption' => $html,
            'parse_mode' => 'HTML',
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type:multipart/form-data"
        ));
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        $output = curl_exec($ch);

        //delete file backup after send to telegram
        File::delete($filepath);

        //======================================= end sendFile ===========================================/

        \Log::info("Cron is working fine!");
        return 0;
    }
}
