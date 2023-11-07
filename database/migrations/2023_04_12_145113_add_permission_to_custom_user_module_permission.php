<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPermissionToCustomUserModulePermission extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_user_module_permission', function (Blueprint $table) {
            //
          $table->text('custom_permission')->nullable()->after('module_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('custom_user_module_permission', function (Blueprint $table) {
            //
          $table->dropColumn('custom_permission');
        });
    }
}
