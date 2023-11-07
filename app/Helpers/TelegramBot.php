<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;
class TelegramBot
{
    private static function postRequestCurl($url, $post_fields)
    {
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

        return $output;
    }

    private static function buttonAction()
    {
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

        return $keyboard;
    }

    public static function sendFile($filePath, $html)
    {
        $buttonAction = self::buttonAction();

        $url = env('TELEBOT_API_URL') . env('TELEBOT_ID') . "/sendDocument?chat_id=" . env('TELEBOT_CHAT_ID') . "&reply_markup={$buttonAction}";

        $post_fields = array(
            'chat_id' => env('TELEBOT_CHAT_ID'),
            'document' => new \CURLFile($filePath),
            'caption' => $html,
            'parse_mode' => 'HTML',
        );

        $curl = self::postRequestCurl($url, $post_fields);
        return $curl;
    }

    public static function sendImage($image, $html)
    {
        $url = env('TELEBOT_API_URL') . env('TELEBOT_ID') . "/sendPhoto?chat_id=" . env('TELEBOT_CHAT_ID');
        $post_fields = array(
            'chat_id' => env('TELEBOT_CHAT_ID'),
            'photo' => $image,
            'caption' => $html,
            'parse_mode' => 'HTML'
        );

        $curl = self::postRequestCurl($url, $post_fields);
        return $curl;
    }

    public static function sendMessage($message = '')
    {
        $url = env('TELEBOT_API_URL') . env('TELEBOT_ID') . "/sendMessage?chat_id=" . env('TELEBOT_CHAT_ID') . '&text=' . $message;
        $post_fields = [];

        $curl = self::postRequestCurl($url, $post_fields);
        return $curl;
    }

    public static function sendHtml($html, $config_url = null)
    {
      //Html tag with new line is not supported
      if ($config_url == null){
        $url = env('TELEBOT_API_URL') . env('TELEBOT_ID') . "/sendMessage?chat_id=" .env('TELEBOT_CHAT_ID'). "&text=$html&parse_mode=HTML";
      }else{
        $url = $config_url;
      }
      $post_fields = [];
      $curl = self::postRequestCurl($url, $post_fields);
      return $curl;
    }
}
