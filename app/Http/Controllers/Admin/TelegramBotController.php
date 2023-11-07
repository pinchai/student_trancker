<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TelegramBot;
use App\Models\Permission;
use Illuminate\Http\Request;

class TelegramBotController extends Controller
{
  const MODULE_KEY = 'telegram_bot';

  //telegram_bot lists
  public function get(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getViewPermission())) {
      $table_size = $request->input('table_size');
      $data = $this->getLists($table_size);
      return $this->responseWithData($data);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  function getLists($table_size)
  {
    if (empty($table_size)) {
      $table_size = 10;
    }

    $data = TelegramBot::lists()->paginate($table_size);

    $response = [
      'pagination' => [
        'total' => $data->total(),
        'per_page' => $data->perPage(),
        'current_page' => $data->currentPage(),
        'last_page' => $data->lastPage(),
        'from' => $data->firstItem(),
        'to' => $data->lastItem()
      ],
      'data' => $data->items(),
    ];
    return $response;

  }

  //telegram_bot store
  public function store(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getCreatePermission())) {
      /** check validation */
      $this->checkValidation($request);
      $telegram_bot = new TelegramBot();
      $telegram_bot->setData($request);
      $telegram_bot->save();
      return response()->json([
        'data' => $telegram_bot,
        'combo_list' => TelegramBot::comboList(),
        'success' => 1,
        'message' => 'Your action has been completed successfully.'
      ], 200);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  //telegram_bot update
  public function update(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getUpdatePermission())) {

      $this->validate($request, [
        'id' => 'required',
        'bot_toked' => 'required',
        'chat_id' => 'required',
        'action' => 'required',
      ]);
      $telegram_bot = TelegramBot::find($request->input('id'));
      $telegram_bot->setData($request);
      $telegram_bot->save();

      return response()->json([
        'data' => $telegram_bot,
        'combo_list' => TelegramBot::comboList(),
        'success' => 1,
        'message' => 'Your action has been completed successfully.'
      ], 200);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  //telegram_bot delete
  public function delete(Request $request)
  {
    if (Permission::authorize(self::MODULE_KEY, Permission::getDeletePermission())) {

      $this->validate($request, [
        'id' => 'required'
      ]);
      $telegram_bot = TelegramBot::find($request->input('id'));
      $telegram_bot->delete();
      return response()->json([
        'data' => $telegram_bot,
        'combo_list' => TelegramBot::comboList(),
        'success' => 1,
        'message' => 'Your action has been completed successfully.'
      ], 200);
    } else {
      return response()->json(['success' => 0, 'message' => 'Insufficient permission.'], 403);
    }
  }

  //telegram_bot sendTest
  public function sendTest(Request $request)
  {
    $this->checkValidation($request);
    $bot_toked = $request->bot_toked;
    $chat_id = $request->chat_id;

    $config_url = "https://api.telegram.org/bot$bot_toked/sendMessage?chat_id=$chat_id&text=BotToked:{$bot_toked}|ChatID:{$chat_id}";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      "Content-Type:multipart/form-data"
    ));
    curl_setopt($ch, CURLOPT_URL, $config_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_FAILONERROR, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, []);
    $output = curl_exec($ch);

    return response()->json([
      'data' => $output,
      'success' => 1,
      'message' => 'Your action has been completed successfully.'
    ], 200);
  }

  public function checkValidation($data)
  {
    $this->validate($data, [
      'bot_toked' => 'required',
      'chat_id' => 'required',
    ]);
  }
}
