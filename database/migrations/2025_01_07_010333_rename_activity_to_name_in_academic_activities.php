<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            $table->renameColumn('activity', 'name');
        });
    }

    public function down()
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            $table->renameColumn('name', 'activity');
        });
    }
};
