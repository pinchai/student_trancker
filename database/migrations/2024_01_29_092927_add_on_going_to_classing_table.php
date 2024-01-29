<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOnGoingToClassingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('classing', function (Blueprint $table) {
            //
            $table->string('on_going')
                ->default('midterm')
                ->comment('midterm, final')
                ->after('classing_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('classing', function (Blueprint $table) {
            //
            $table->dropColumn('on_going');
        });
    }
}
