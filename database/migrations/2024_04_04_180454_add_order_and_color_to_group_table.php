<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOrderAndColorToGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('group', function (Blueprint $table) {
            //
            $table->integer('order_no')->default(0)->after('name');
            $table->string('color')->default('#217104')->after('order_no');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('group', function (Blueprint $table) {
            //
            $table->dropColumn('order_no');
            $table->dropColumn('color');
        });
    }
}
