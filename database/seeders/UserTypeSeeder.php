<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_type')->insert([
            [
                'type' => 'Dev',
                'level' => 10,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'type' => 'Super User',
                'level' => 9,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'type' => 'User',
                'level' => 8,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'type' => 'Cashier',
                'level' => 7,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
    }
}
