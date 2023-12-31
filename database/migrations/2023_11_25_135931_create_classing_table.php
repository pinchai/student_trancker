<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classing', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_time');
            $table->bigInteger('group_id');
            $table->string('section_id');
            $table->text('remark')->nullable();
            $table->string('image_one')->nullable();
            $table->string('image_two')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classing');
    }
}
