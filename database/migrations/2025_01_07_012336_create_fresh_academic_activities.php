<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::dropIfExists('academic_activities');
        
        Schema::create('academic_activities', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('name');
            $table->string('semester');
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->string('status')->default('à venir');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('academic_activities');
    }
};
