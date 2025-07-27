<?php

try {
    $pdo = new PDO("mysql:host=127.0.0.1", "root", "");
    
    // Supprime la base de données si elle existe
    $pdo->exec("DROP DATABASE IF EXISTS Insti_academy");
    
    // Crée la base de données
    $pdo->exec("CREATE DATABASE Insti_academy");
    
    echo "Base de données réinitialisée avec succès !";
    
} catch(PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
