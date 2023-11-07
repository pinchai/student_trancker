<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Haruncpi\LaravelUserActivity\Traits\Loggable;

class TelegramBot extends Model
{
    use Loggable;
    use HasFactory, SoftDeletes;

    const TABLE_NAME = 'telegram_bot';
    const ID = 'id';
    const BOT_TOKED = 'bot_toked';
    const CHAT_ID = 'chat_id';
    const ACTION = 'action';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $table = self::TABLE_NAME;

    public static function lists(){
        return self::select('*');
    }

    public static function comboList(){
        return self::orderBy('id', 'desc')->get();
    }

    public function setData($data)
    {
        $this->{self::BOT_TOKED} = $data[self::BOT_TOKED];
        $this->{self::CHAT_ID} = $data[self::CHAT_ID];
    }

    public static function getByAction($action){
      $bot = TelegramBot::where('action', $action)->first();
      return $bot;
    }

}
