<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsCloseToScoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('score', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('is_close')
                ->default(0)
                ->after('on_going');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('score', function (Blueprint $table) {
            //
            $table->dropColumn('is_close');
        });
    }
}
