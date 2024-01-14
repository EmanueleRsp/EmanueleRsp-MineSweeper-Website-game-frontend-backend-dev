<?php
session_start();


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
        <link rel="stylesheet" href="../css/ranking.css">
        <link rel="stylesheet" href="../css/typing.css">
        <link rel="stylesheet" href="../css/table-button.css">

    </head>

    <body>
    <script src="../js/theme.js"></script>
            
        <?php
            include("auth.php");
        ?>
        

        <div class="ranking content">
                
            <div class="title">
                <h1 class='typing'>
                    Classifiche
                </h1>
            </div>

            <div class="description">
                Qui puoi visualizzare le statistiche dei giocatori e i migliori tempi per ciascuna difficoltà di gioco.
            </div>

            <div class="stats">
                
                <div class="subtitle">
                    <ion-icon name="analytics"></ion-icon>
                    <h2>Statistiche generali</h2>
                </div>

                <div class="boxes">

                    <div class="podium-box">

                        <div class="podium-title">
                            Partite giocate
                        </div>

                        <div class="podium partiteGiocate">

                            <div class="box box2">
                                <span class="box-icon">🥈</span>
                                <span class="number" id="partiteGiocate-num-2">--</span>
                                <span class="text" id="partiteGiocate-usr-2">--</span>                                
                            </div>
                            
                            <div class="box box1">
                                <span class="box-icon">🥇</span>
                                <span class="number" id="partiteGiocate-num-1">--</span>   
                                <span class="text" id="partiteGiocate-usr-1">--</span>
                            </div>
                        
                            <div class="box box3">
                                <span class="box-icon">🥉</span>
                                <span class="number" id="partiteGiocate-num-3">--</span>
                                <span class="text" id="partiteGiocate-usr-3">--</span>
                                
                            </div>

                        </div>

                    </div>

                    <span></span>

                    <div class="podium-box">

                        <div class="podium-title">
                            Partite vinte
                        </div>

                        <div class="podium partiteVinte">

                            <div class="box box2">
                                <span class="box-icon">🥈</span>
                                <span class="number" id="partiteVinte-num-2">--</span>
                                <span class="text" id="partiteVinte-usr-2">--</span>
                                
                            </div>
                            
                            <div class="box box1">
                                <span class="box-icon">🥇</span>
                                <span class="number" id="partiteVinte-num-1">--</span>
                                <span class="text" id="partiteVinte-usr-1">--</span>
                                
                            </div>
                        
                            <div class="box box3">
                                <span class="box-icon">🥉</span>
                                <span class="number" id="partiteVinte-num-3">--</span>
                                <span class="text" id="partiteVinte-usr-3">--</span>                                
                            </div>

                        </div>

                    </div>

                    <span></span>

                    <div class="podium-box">

                        <div class="podium-title">
                            Campi scoperti
                        </div>

                        <div class="podium campiScoperti">

                            <div class="box box2">
                                <span class="box-icon">🥈</span>
                                <span class="number" id="campiScoperti-num-2">--</span>
                                <span class="text" id="campiScoperti-usr-2">--</span>
                                
                            </div>
                            
                            <div class="box box1">
                                <span class="box-icon">🥇</span>
                                <span class="number" id="campiScoperti-num-1">--</span>
                                <span class="text" id="campiScoperti-usr-1">--</span>
                                
                            </div>
                        
                            <div class="box box3">
                                <span class="box-icon">🥉</span>
                                <span class="number" id="campiScoperti-num-3">--</span>
                                <span class="text" id="campiScoperti-usr-3">--</span>                                
                            </div>

                        </div>

                    </div>

                    <span></span>
                    
                    <div class="podium-box">

                        <div class="podium-title">
                            Obiettivi trovati
                        </div>

                        <div class="podium obiettiviTrovati">

                            <div class="box box2">
                                <span class="box-icon">🥈</span>
                                <span class="number" id="obiettiviTrovati-num-2">--</span>
                                <span class="text" id="obiettiviTrovati-usr-2">--</span>
                                
                            </div>
                            
                            <div class="box box1">
                                <span class="box-icon">🥇</span>
                                <span class="number" id="obiettiviTrovati-num-1">--</span>
                                <span class="text" id="obiettiviTrovati-usr-1">--</span>
                                
                            </div>

                            <div class="box box3">
                                <span class="box-icon">🥉</span>
                                <span class="number" id="obiettiviTrovati-num-3">--</span>
                                <span class="text" id="obiettiviTrovati-usr-3">--</span>
                                
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div class="storico">
                
                <div class="subtitle">
                    <ion-icon name="archive"></ion-icon>
                    <h2>Migliori tempi</h2>
                </div>

                <div class="inputs">
                    <div class="input-box">
                        <input type="radio" name="difficolta" id="principiante" value="principiante" checked>
                        <label for ="principiante">Principiante</label> 
                    </div>
                    <div class="input-box">
                        <input type="radio" name="difficolta" id="intermedio" value="intermedio">
                        <label for ="intermedio">Intermedio</label> 
                    </div>
                    <div class="input-box">
                        <input type="radio" name="difficolta" id="avanzato" value="avanzato">
                        <label for ="avanzato">Avanzato</label> 
                    </div>
                    <div class="input-box">
                        <input type="radio" name="difficolta" id="superman" value="superman">
                        <label for ="superman">Superman</label> 
                    </div>
                    <div class="input-box">
                        <input type="radio" name="difficolta" id="extraterrestre" value="extraterrestre">
                        <label for ="extraterrestre">Extraterrestre</label> 
                    </div>
                    <div class="input-box">
                        <input type="radio" name="difficolta" id="divino" value="divino">
                        <label for ="divino">Divino</label> 
                    </div>
                    
                </div>


                <ul id="table-games">
                    <li class="table-header">
                        <div class="col col-1">Posizione</div>
                        <div class="col col-2">Utente</div>
                        <div class="col col-3">Modalità</div>
                        <div class="col col-4">Tempo</div>
                        <div class="col col-5">Data</div>
                    </li>
                    <li class="table-row">
                        <div class="col col-1" data-label="posizione">--</div>
                        <div class="col col-2" data-label="utente">--</div>
                        <div class="col col-3" data-label="modalita">--</div>
                        <div class="col col-4" data-label="tempo">--</div>
                        <div class="col col-5" data-label="data">--</div>
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
        
        <script src="../js/ranking.js"></script>
        <script src="../js/audio.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>    
    
        
    </body>
    
</html>