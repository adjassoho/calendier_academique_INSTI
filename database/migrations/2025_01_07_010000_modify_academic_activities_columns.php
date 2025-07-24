<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            if (!Schema::hasColumn('academic_activities', 'status')) {
                $table->string('status')->default('à venir')->after('end_date');
            }
        });
    }

    public function down()
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
