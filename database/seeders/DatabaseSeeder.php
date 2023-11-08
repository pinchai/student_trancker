<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PermissionSeeder::class,
            UserTypeSeeder::class,
            ModuleSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            BranchSeeder::class,
            CustomPermissionSeeder::class,
            SettingSeeder::class,
            TelegramBotSeeder::class,
            PositionSeeder::class,
        ]);
    }
}
