<?php

try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=insti_academy",
        "root",
        "",
        array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
    );
    
    // Test de création de la table
    $sql = "CREATE TABLE IF NOT EXISTS academic_activities (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        year VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        semester VARCHAR(255) NOT NULL,
        start_date DATETIME NOT NULL,
        end_date DATETIME NOT NULL,
        status VARCHAR(255) DEFAULT 'à venir',
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )";
    
    $pdo->exec($sql);
    echo "Connexion et création de table réussies !";
    
} catch(PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
