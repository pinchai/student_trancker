<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CustomPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('custom_permission')->insert([
            'custom_user_module_permission_id' => 1,
            'permission' => 'view_card',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('custom_permission')->insert([
            'custom_user_module_permission_id' => 2,
            'permission' => 'view_cost',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
