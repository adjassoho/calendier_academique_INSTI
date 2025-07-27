<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('study_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // '1ère année', '2e année', '3e année'
            $table->integer('year_number');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('study_levels');
    }
};
