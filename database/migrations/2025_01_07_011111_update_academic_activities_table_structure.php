<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            // Supprimer l'ancienne colonne activity
            $table->dropColumn('activity');
            
            // Ajouter les nouvelles colonnes
            $table->string('name')->after('semester');
            $table->string('status')->default('à venir')->after('end_date');
        });
    }

    public function down()
    {
        Schema::table('academic_activities', function (Blueprint $table) {
            // Restaurer l'ancienne structure
            $table->dropColumn(['name', 'status']);
            $table->string('activity')->after('semester');
        });
    }
};
