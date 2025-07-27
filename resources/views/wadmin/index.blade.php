<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration INSTI</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
        }
        #admin-root {
            min-height: 100vh;
        }
    </style>
    @viteReactRefresh
    @vite(['resources/js/wadmin/admin.jsx'])
</head>
<body>
    <div id="admin-root"></div>
</body>
</html>
