<?php

namespace Database\Seeders;

use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $setting = [
            [
                'id' => null,
                'value' => '[{"label":"Clock In IP Address","key":"ip","value":"0.0.0.0"}]',
                'key' => 'ip',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'id' => null,
                'value' => '[{"label":"Default Table Size(10, 50, 100, 1000)","key":"default_table_size","value":"100"}]',
                'key' => 'default_table_size',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ];
        foreach ($setting as $item) {
            $is_exits = Setting::where('key', $item['key'])->get();
            if (count($is_exits) == 0) {
                DB::table('setting')->insert([
                    [
                        'value' => $item['value'],
                        'key' => $item['key'],
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]
                ]);
            }
        }
    }
}
