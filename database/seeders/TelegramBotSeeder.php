<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TelegramBotSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('telegram_bot')->insert(
      [
        'bot_toked' => '5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ',
        'chat_id' => '756357473__',
        'action' => 'db_backup',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]
    );
    DB::table('telegram_bot')->insert(
      [
        'bot_toked' => '5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ',
        'chat_id' => '756357473__',
        'action' => 'daily_report',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]
    );
    DB::table('telegram_bot')->insert(
      [
        'bot_toked' => '5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ',
        'chat_id' => '756357473__',
        'action' => 'error_log',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]
    );
    DB::table('telegram_bot')->insert(
      [
        'bot_toked' => '5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ',
        'chat_id' => '756357473__',
        'action' => 'hr',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]
    );
    DB::table('telegram_bot')->insert(
      [
        'bot_toked' => '5442577783:AAHqbqmchMEPsNkyllL6zYG73sBdC_1cyHQ',
        'chat_id' => '756357473__',
        'action' => 'hr_channel',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now()
      ]
    );

  }
}
