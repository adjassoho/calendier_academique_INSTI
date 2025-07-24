<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Administration - Calendrier Académique</title>
    
    <!-- Material UI Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    
    <!-- Vite -->
    @viteReactRefresh
    @vite(['resources/js/admin/app.jsx'])
    
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
        }
        #admin-root {
            min-height: 100vh;
        }
        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 1.2rem;
            color: #666;
        }
    </style>
</head>
<body>
    <div id="admin-root"></div>
</body>
</html>
