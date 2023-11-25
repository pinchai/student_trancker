<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('branch')->insert(
            [
                'id' => 1,
                'name' => 'Phnom Penh',
                'phone' => '012345678',
                'address' => 'Phnom Penh',
                'status' => 1,
                'logo' => 'ons.png',
                'email' => 'zorin@mail.com',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        );
    }
}
