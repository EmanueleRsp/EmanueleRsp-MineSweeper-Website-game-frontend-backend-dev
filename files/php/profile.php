<?php
session_start();

if(!isset($_SESSION["username"])){
    header("Location: ./");
    exit();
}

?>
<!DOCTYPE html>
<html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Prato fiorito</title>
        <link rel="icon" type="image/x-icon" href="../img/favicon.ico">

        <link rel="stylesheet" href="../css/mainStyle.css">
        <link rel="stylesheet" href="../css/header.css">
        <link rel="stylesheet" href="../css/auth.css">
        <link rel="stylesheet" href="../css/notify.css">
        <link rel="stylesheet" href="../css/profile.css">
        <link rel="stylesheet" href="../css/typing.css">
        <link rel="stylesheet" href="../css/table-button.css">

    </head>

    <body>
    <script src="../js/theme.js"></script>
            
        <?php
            include("auth.php");
        ?>

        <div class="profile content">

            <div class="disconnection-box">
                <div class="disconnection">
                    <span>Disconnettiti</span>
                    <ion-icon name="exit-outline"></ion-icon>
                </div>
            </div>
            <div class="title-box">
                <div class="title">
                    <h1 id="utente" class='typing'>
                        <?php
                            $ora = date("H");
                            if($ora > 3 && $ora < 12)
                                echo '🌄 Buongiorno ';
                            elseif($ora < 19 && $ora >= 12)
                                echo '☀️ Buon pomeriggio ';
                            else
                                echo '🌙 Buonasera ';
                            
                            echo $_SESSION["username"] . '!';
                        ?>
                    </h1>
                </div>
            </div>
            <div class="stats">
                
                <div class="subtitle">
                    <ion-icon name="analytics"></ion-icon>
                    <h2>Statistiche</h2>
                </div>

                <div class="boxes">
                    <div class="box box1">
                        <span class="box-icon">✔️</span>
                        <span class="text">Partite fatte</span>
                        <span class="number partite-fatte">0</span>
                        
                    </div>
                    
                    <div class="box box2">
                        <span class="box-icon">🎉</span>
                        <span class="text">Percentuale vittorie</span>
                        <span class="number percentuale-vittorie">--%</span>
                        
                    </div>
                    
                    <div class="box box3">
                        <span class="box-icon">🔍</span>
                        <span class="text">Campi scoperti</span>
                        <span class="number campi-scoperti">0</span>
                        
                    </div>
                    
                    <div class="box box4">
                        <span class="box-icon">🌼💣</span>
                        <span class="text">Obiettivi trovati</span>
                        <span class="number obiettivi-scoperti">0</span>
                        
                    </div>
                </div>

                <div class="other">
                    <span class="sub">Statistiche dettagliate:</span>
                    <ul id="table-stats">
                        <li class="table-header">
                            <div class="col col-1">Difficoltà</div>
                            <div class="col col-2">Partite giocate</div>
                            <div class="col col-3">Percentuale Vittorie</div>
                            <div class="col col-4">Campi scoperti</div>
                            <div class="col col-5">Obiettivi trovati</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Principiante</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="campiScoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Intermedio</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="Campi scoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Avanzato</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="Campi scoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Superman</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="Campi scoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Alieno</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="Campi scoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Divino</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="Campi scoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Difficoltà">Personalizzato</div>
                            <div class="col col-2" data-label="Partite giocate">0</div>
                            <div class="col col-3" data-label="Percentuale vittorie">--%</div>
                            <div class="col col-4" data-label="Campi scoperti">0</div>
                            <div class="col col-5" data-label="Obiettivi trovati">0</div>
                        </li>
                    </ul>
            
                </div>


            </div>

            <div class="storico">
                
                <div class="subtitle">
                    <ion-icon name="archive"></ion-icon>
                    <h2>Storico partite</h2>
                </div>

                <ul id="table-games">
                    <li class="table-header">
                        <div class="col col-1">Data</div>
                        <div class="col col-2">Modalità</div>
                        <div class="col col-3">difficoltà</div>
                        <div class="col col-4">Risultato</div>
                        <div class="col col-5">Tempo</div>
                    </li>
                    <li class="table-row">
                        <div class="col-content">
                            <div class="col col-1" data-label="Data">--</div>
                            <div class="col col-2" data-label="Modalità">--</div>
                            <div class="col col-3" data-label="Difficoltà">--</div>
                            <div class="col col-4" data-label="Risultato">--</div>
                            <div class="col col-5" data-label="Tempo">--</div>
                        </div>
                        <span></span>
                        <div class="more-content">
                            <div>Parametri: <span data-label="Parametri">--</span></div>
                            <div>campiScoperti: <span data-label="campiScoperti">--</span></div>
                            <div>obiettiviTrovati: <span data-label="obiettiviTrovati">--</span></div>
                        </div>
                    </li>
                </ul>
            
                
                <div class="table-scroll-btn">
                    <button id="prev" class="prev">&lt;
                    </button>
                    <button id="page" class="page">
                    </button>
                    <button id="next" class="next">&gt;
                    </button>
                </div>

            </div>
        </div>
        
        <script src="../js/profile.js"></script>
        <script src="../js/audio.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        
    </body>
</html>