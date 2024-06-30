<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDurationToClassingTable extends Migration
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
            $table->decimal('duration')->default(1.5)->after('on_going');
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
            $table->dropColumn('duration');
        });
    }
}
