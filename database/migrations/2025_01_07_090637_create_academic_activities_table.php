<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('academic_activities', function (Blueprint $table) {
            $table->id();
            $table->string('year');
            $table->string('name');
            $table->enum('semester', ['Semestre 1', 'Semestre 2']);
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('status', ['à venir', 'en cours', 'terminé'])->default('à venir');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('academic_activities');
    }
};
