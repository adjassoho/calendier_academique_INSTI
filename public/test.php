<?php

echo "PHP fonctionne correctement !<br>";
echo "Version de PHP : " . phpversion() . "<br>";
echo "Document Root : " . $_SERVER['DOCUMENT_ROOT'] . "<br>";
echo "Request URI : " . $_SERVER['REQUEST_URI'] . "<br>";
echo "Script Name : " . $_SERVER['SCRIPT_NAME'] . "<br>";

// Test de la base de données
try {
    $pdo = new PDO(
        "mysql:host=127.0.0.1;dbname=Insti_academy",
        "root",
        "",
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );
    echo "Connexion à la base de données réussie !<br>";
    
    // Test de la table academic_activities
    $stmt = $pdo->query("SELECT COUNT(*) FROM academic_activities");
    $count = $stmt->fetchColumn();
    echo "Nombre d'activités dans la base : " . $count . "<br>";
    
} catch(PDOException $e) {
    echo "Erreur de base de données : " . $e->getMessage() . "<br>";
}
