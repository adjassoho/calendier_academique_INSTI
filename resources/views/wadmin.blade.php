<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Administration - Calendrier Académique</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/wadmin/admin.jsx'])
    <style>
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            font-size: 24px;
            color: #666;
        }
    </style>
</head>
<body>
    <div id="app">
        <div class="loading">Chargement de l'interface d'administration...</div>
    </div>
    <script>
        console.log('Page wadmin chargée');
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM chargé');
        });
    </script>
</body>
</html>
