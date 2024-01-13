<?php
session_start();


?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <meta name="data" content='<?php echo json_encode($_POST)?>'>
    
    <title>Prato fiorito</title>
    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">

    <link rel="stylesheet" href="../css/mainStyle.css">
    <link rel="stylesheet" href="../css/game.css">
    <link rel="stylesheet" href="../css/header.css">
    <link rel="stylesheet" href="../css/auth.css">
    <link rel="stylesheet" href="../css/notify.css">
    
    <script src="../js/game.js"></script>

</head>
<body>
    
    <script src="../js/theme.js"></script>

    <?php
        include("auth.php");
    ?>
    
    <div id="control">

        <div>
            <ion-icon name="flag"></ion-icon>
            <span id="mine"></span>
        </div>

        <div>
            <ion-icon name="help-circle"></ion-icon>
            <span id="minesLeft"></span>
        </div>

        <div id="clock">
            <ion-icon name="time"></ion-icon>
            <span id="time"></span>
        </div>

        <div id="zoom">
            <div class="icons">
            <ion-icon id='zoom-in' name="add-circle"></ion-icon>
            <ion-icon id='zoom-out' name="remove-circle"></ion-icon>
            </div>
            <span>ZOOM</span>
        </div>

        <div class="div-btn">
            <button id="btn-flag">🚩</button>
        </div>
        
    </div>

    <div id="board"></div>

    <div id="btn-menu">
        <ion-icon name="menu-outline"></ion-icon>
    </div>

    <div id="game-menu-box">
        <div id="game-menu">
            <span id="result"></span>
            <span id="info"></span>
            <div id="stats">
                Tempo: <span id="tempo-impiegato"></span>
                Mine trovate: <span id="mine-trovate"></span>
                Campi scoperti: <span id="celle-scoperte"></span>
            </div>
            <div id="buttons">
                    
                <button id="restartGame" class="menu-btn">Riavvia partita</button>
                <button id="newGame" class="menu-btn">Nuova partita</button>
                <button id='changeGame' class="menu-btn">Cambia impostazioni</button>
        
            </div>
        </div>
    </div>

    <div class="game-notify">
        <span class="notify-title">Attenzione!</span>
        <span class="notify-text">Il numero di celle da scoprire è troppo elevato, ne sono state scoperte solo una parte.</span>
    </div>

    <script src="../js/audio.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>    
    
</body>
</html>