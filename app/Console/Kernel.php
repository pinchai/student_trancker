<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
        Commands\BackupDBCron::class,
        Commands\NotifyCron::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('backup_db:cron')
            ->timezone(env('APP_TIMEZONE'))
            ->everyMinute();

        $schedule->command('notify:cron')
            ->timezone(env('APP_TIMEZONE'))
            ->everyMinute();

        // $schedule->command('inspire')->hourly();
        //$schedule->call('\App\Http\Controllers\BackupDBController@backup')->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
