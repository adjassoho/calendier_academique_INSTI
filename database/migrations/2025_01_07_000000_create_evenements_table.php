<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->date('date');
            $table->string('type');  // Maintenant c'est un string simple pour plus de flexibilité
            $table->enum('statut', ['draft', 'upcoming', 'completed', 'cancelled']);
            $table->text('description');
            $table->json('niveaux_etude'); // ['licence1', 'licence2', 'licence3', 'master1', 'master2']
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
