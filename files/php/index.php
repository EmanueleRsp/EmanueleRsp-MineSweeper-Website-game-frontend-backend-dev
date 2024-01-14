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
        <link rel="stylesheet" href="../css/index.css">
        <link rel="stylesheet" href="../css/typing.css">

    </head>

    <body>
    
        <script src="../js/theme.js"></script>
            
        <?php
            include("auth.php");
        ?>
        
        <div class="home">

            <div class="home-content">

                <div class="page title">
                    
                    <video autoplay muted loop class="logo first">
                        <source src="../vid/Logo-vid.webm" type="video/webm">
                    </video>

                    <video autoplay muted loop class="logo second">
                        <source src="../vid/Logo-vid.webm" type="video/webm">
                    </video>
                    
                    <video autoplay muted loop class="logo third">
                        <source src="../vid/Logo-vid.webm" type="video/webm">
                    </video>

                    <div class="card-box x1">
                    <div class='card'>
                        <div class="card-inner">
                            <div class="card-front">
                                🚩
                            </div>    
                            <div class="card-back">
                                    <video autoplay muted loop>
                                        <source src="../vid/bombExplosion.webm" type="video/webm">
                                    </video>
                            </div>
                        </div>
                    </div>

                    <div class='card'>
                        <div class="card-inner">
                            <div class="card-front">
                                
                            </div>    
                            <div class="card-back">
                                    🌼
                            </div>
                        </div>
                    </div>
                    
                    <video autoplay muted loop class="logo">
                        <source src="../vid/Logo-vid.webm" type="video/webm">
                    </video>

                    </div>

                    <div class="card-box x2">
                    <div class='card'>
                        <div class="card-inner">
                            <div class="card-front">
                            </div>    
                            <div class="card-back">
                                😱
                            </div>
                        </div>
                    </div>

                    
                    <div class='card'>
                        <div class="card-inner">
                            <div class="card-front">
                                🤔
                            </div>    
                            <div class="card-back">
                                ☠️
                            </div>
                        </div>
                    </div>

                    
                    <video autoplay muted loop class="logo">
                        <source src="../vid/Logo-vid.webm" type="video/webm">
                    </video>
                    </div>



                    <div class="main-title">
                        <h1 class="typing">PRATO FIORITO</h1>
                    </div>

                </div>

                
                <div class="page scroll">

                    <div class="container">
                    
                        <div class="slider-title">
                            <h2>Orientarsi nel sito</h2>
                        </div>
                        
                        <div class="navigation">
                            <div class="btn btn1 risalto"></div>
                            <div class="btn btn1"></div>
                            <div class="btn btn1"></div>
                            <div class="btn btn1"></div>
                            <div class="btn btn1"></div>
                        </div>

                        <div class="img-slider 1">

                            <div class="slide slide1 risalto">
                                <img src="../img/snapshot/NuovaPartita.png" alt="">
                                <div class="info">
                                    <h3>Nuova partita</h3>
                                    <p>Dalla barra in alto è possibile navigare in tutto il sito: in questa pagina è possibile settare le impostazioni desiderate per poi iniziare una nuova partita. È possibile scegliere la modalità (classica o a tempo) e la difficoltà. Il gioco memorizza alcune statistiche relative alla partita, ma solo se il giocatore si è precedentemente loggato.
                                    </p>
                                </div>
                            </div>

                            
                            <div class="slide slide1">
                                <img src="../img/snapshot/Login.png" alt="">
                                <div class="info">
                                    <h3>Login</h3>
                                    <p>Se non loggati, nella barra in alto sarà disponibile l'apposito pulsante, che offre inoltre anche la possibilità di registrarsi o di impostare una nuova password se dimenticata. 
                                    </p>
                                </div>
                            </div>

                            
                            <div class="slide slide1">
                                <img src="../img/snapshot/Gioco.png" alt="">
                                <div class="info">
                                    <h3>Gioco</h3>
                                    <p>Una volta settato, il gioco può partire! Nella schermata di gioco sono visibili: bandierine ancora da piazzare (ad inizio gioco indica quindi anche il numero obiettivi), tempo trascorso (o rimanente), pulsanti per abilitare il posizionamento di bandierine e di zoom. In alto a destra è inoltre disponibile un menù che consente di riavviare la partita in corso, iniziarne una nuova oppure cambiare impostazioni della partita. 
                                    </p>
                                </div>
                            </div>

                            
                            <div class="slide slide1">
                                <img src="../img/snapshot/Classifica.png" alt="">
                                <div class="info">
                                    <h3>Classifica</h3>
                                    <p>In questa pagina sono disponibili i podi dei giocatori con le migliori statistiche. È presente inoltre una tabella che racchiude la classifica dei migliori tempi per ciascuna modalità di gioco. 
                                    </p>
                                </div>
                            </div>

                            
                            <div class="slide slide1">
                                <img src="../img/snapshot/Profilo.png" alt="">
                                <div class="info">
                                    <h3>Profilo</h3>
                                    <p>Se loggati, sarà disponibile la pagina del profilo, utile a visualizzare varie statistiche di gioco, oltre che allo storico delle partite giocate contenente ulteriori informazioni. 
                                    </p>
                                </div>
                            </div>

                        </div>
                        

                    </div>

                    <div class="container">
                        
                        <div class="slider-title">
                            <h2>Come giocare a Prato fiorito</h2>
                        </div>

                        <div class="navigation">
                                <div class="btn btn2 risalto"></div>
                                <div class="btn btn2"></div>
                                <div class="btn btn2"></div>
                                <div class="btn btn2"></div>
                                <div class="btn btn2"></div>
                                <div class="btn btn2"></div>
                        </div>

                        <div class="img-slider s2">

                            <div class="slide slide2 risalto">
                                <img src="../img/snapshot/how-1.png" alt="">
                                <div class="info">
                                    <h3>Introduzione</h3>
                                    <p>Il campo da gioco di Prato fiorito (o Campo Minato) si presenta come una griglia di celle il cui numero dipende dalla difficoltà impostata precedentemente. Alcune di queste celle contengono dei fiori (o mine) e lo scopo del gioco è dunque quello di scoprire tutte le celle del campo che NON contengono tali obiettivi. A seconda della modalità di gioco inoltre, è possibile impostare un timer entro il quale occorre aver terminato la partita, altrimenti questa si interrompe e viene considerata persa.
                                    </p>
                                </div>
                            </div>

                            <div class="slide slide2">
                                <img src="../img/snapshot/how-2.png" alt="">
                                <div class="info">
                                    <h3>Inizio</h3>
                                    <p>La partita inizia cliccando con il tasto sinistro la prima cella: a questo punto il timer parte. Perdere al primo click è impossibile, a meno che la partita sia stata riavviata. Il primo tocco scopre quindi sempre un'area del campo da cui poter partire.
                                    </p>
                                </div>
                            </div>

                            <div class="slide slide2">
                                <img src="../img/snapshot/how-3.png" alt="">
                                <div class="info">
                                    <h3>I numeri</h3>
                                    <p>I valori apparsi sul campo da gioco indicano l'esatto numero di celle adiacenti in orizzontale, verticale o diagonale che contengono un fiore (o mina). Combinando questi indizi, possiamo dedurre (più o meno facilmente) quali sono queste celle. Nell'esempio sono mostrati alcuni ragionamenti (le frecce rosse indicano dove si trova un obiettivo, quelle in verde celle sicuramente libere).
                                    </p>
                                </div>
                            </div>

                            <div class="slide slide2">
                                <img src="../img/snapshot/how-4.png" alt="">
                                <div class="info">
                                    <h3>Bandierine</h3>
                                    <p>Se ipotizziamo che una cella contenga un fiore (o mina), possiamo contrassegnarla con una bandierina cliccandoci con il tasto destro oppure abilitando la funzione tramite l'apposito pulsante. Non è possibile contrassegnare più mine di quelle presenti nella griglia di gioco.
                                    </p>
                                </div>
                            </div>

                            <div class="slide slide2">
                                <img src="../img/snapshot/how-5.png" alt="">
                                <div class="info">
                                    <h3>Sviluppo</h3>
                                    <p>Ogni quadrato che non contiene un fiore (o mina) può essere scoperto, in modo da visualizzarne il contenuto della cella corrispondente: lo scopo infatti non è contrassegnare tutte le celle contenenti l'obiettivo da evitare, ma scoprire tutte le altre celle. Se ci riusciamo, la partita si conclude con una vittoria. Se altrimenti viene selezionato una cella contentente l'obiettivo, la partita verrà interrotta e avremo perso.
                                    </p>
                                </div>
                            </div>

                            <div class="slide slide2">
                                <img src="../img/snapshot/how-6.png" alt="">
                                <div class="info">
                                    <h3>Termine della partita</h3>
                                    <p>Una volta terminata la partita è possibile iniziarne una nuova oppure riavviare quella appena terminata: in tal caso le mine saranno già piazzate negli stessi punti della partita precedente e sarà dunque possibile perdere anche al primo click.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>               

            </div>
        </div>

        <script src="../js/index.js"></script>
        <script src="../js/audio.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>    
    

    </body>
    
</html>