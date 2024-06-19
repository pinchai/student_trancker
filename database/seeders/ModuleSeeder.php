<?php

namespace Database\Seeders;

use App\Models\Module;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $module = [
            [
                'module_name' => 'Dashboard',
                'module_key' => 'dashboard',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 10,
                'menu_title' => '',
                'custom_permission' => 'view_card,view_sale_graph,view_income_graph,view_expense_graph',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Branch',
                'module_key' => 'branch',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 20,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Group',
                'module_key' => 'group',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 20,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Position',
                'module_key' => 'position',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 20,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Student',
                'module_key' => 'student',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 20,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Attendance',
                'module_key' => 'attendance',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 20,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Score',
                'module_key' => 'score',
                'featured' => 1,
                'permission' => '1,2,3,4',
                'sequence' => 20,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'User Role',
                'module_key' => 'user_role',
                'featured' => 0,
                'permission' => '1,2,3,4',
                'sequence' => 80,
                'menu_title' => 'user_management',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'User List',
                'module_key' => 'user_list',
                'featured' => 0,
                'permission' => '1,2,3,4',
                'sequence' => 90,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Application Setting',
                'module_key' => 'application_setting',
                'featured' => 0,
                'permission' => '1,2,3,4',
                'sequence' => 110,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'User Activity',
                'module_key' => 'user_activity',
                'featured' => 0,
                'permission' => '1,2,3,4',
                'sequence' => 120,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'module_name' => 'Module',
                'module_key' => 'module',
                'featured' => 0,
                'permission' => '1,2,3,4',
                'sequence' => 140,
                'menu_title' => '',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ];

        foreach ($module as $item) {
            $is_exits = Module::where('module_key', $item['module_key'])->get();
            if (count($is_exits) == 0) {
                DB::table('module')->insert([
                    [
                        'module_name' => $item['module_name'],
                        'module_key' => $item['module_key'],
                        'featured' => $item['featured'],
                        'permission' => '1,2,3,4',
                        'sequence' => $item['sequence'],
                        'menu_title' => $item['menu_title'],
                        'custom_permission' => $item['custom_permission'] ?? null,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ]
                ]);
            }
        }
    }
}
