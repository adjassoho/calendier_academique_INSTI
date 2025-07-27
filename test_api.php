<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

// Test de l'API
try {
    $activity = new App\Models\AcademicActivity();
    $activity->year = '2024-2025';
    $activity->name = 'Test Activity';
    $activity->semester = 'Semestre 1';
    $activity->start_date = '2024-01-07';
    $activity->end_date = '2024-01-08';
    $activity->status = 'à venir';
    $activity->save();
    
    echo "Activité créée avec succès !\n";
    echo "ID: " . $activity->id . "\n";
    
    // Récupérer toutes les activités
    $activities = App\Models\AcademicActivity::all();
    echo "Nombre total d'activités : " . $activities->count() . "\n";
    
} catch(Exception $e) {
    echo "Erreur : " . $e->getMessage() . "\n";
    echo "Fichier : " . $e->getFile() . "\n";
    echo "Ligne : " . $e->getLine() . "\n";
}
