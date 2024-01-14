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
        <link rel="stylesheet" href="../css/typing.css">
        <link rel="stylesheet" href="../css/newGame.css">

    </head>

    <body>
        <script src="../js/theme.js"></script>
            
        <?php
            include("auth.php");
        ?>

        <div id="list__content">
    
            <div id="list__label">Seleziona le impostazioni desiderate:</div>

            <form action="game.php" name='game-form' onsubmit="return validateForm()" method="post">
            
                <div id="list__mode">
                    <div class="mode-title">
                        <h1 class='typing'>Modalità</h1>
                    </div>
                    <div class="list">
                        <div class='label' id="d-classica">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>
                                        <video autoplay muted loop>
                                            <source src="../vid/Logo-vid.webm" type="video/webm">
                                        </video>
                                    </div>
                                    <label for ="classica">Classica</label>    
                                    <input type="radio" name="mode" id="classica" value="classica" checked>
                                </div>    
                                <div class="label-back">
                                    <div class="descrizione">
                                        <div class='boxes box1'>In questa modalità, lo scopo del gioco è tagliare l'erba del campo senza tagliare anche i fiori.</div>
                                        <div class='boxes box2'>Per raggiungere l'obiettivo si seguono le regole standard del gioco, stando dunque attenti a non scoprire le celle contenenti il fiore.</div>
                                        <div class='boxes box3'>Partita classificata: non ci sono limiti di tempo, i migliori finiranno in classifica!</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='label' id="d-tempo">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>
                                        <video autoplay muted loop>
                                            <source src="../vid/bombExplosion.webm" type="video/webm">
                                        </video>
                                    </div>
                                    <label for ="tempo">A tempo</label>   
                                    <input type="radio" name="mode" id="tempo" value="tempo">
                                </div>    
                                <div class="label-back"> 
                                    <div class="descrizione">
                                        <div class='boxes box2'>Imposta il timer e vinci prima che scada il tempo! Lo scopo del gioco è trovare dove sono situate tutte le bombe prima che sia troppo tardi!</div>
                                        <div class='boxes box3'>Per raggiungere l'obiettivo si seguono le regole standard del gioco, stando dunque attenti a non scoprire le celle contenenti la bomba.</div>
                                        <div class='boxes box4'>Questa modalità è utile per allenarsi e migliorare i propri tempi. Partita classificata.</div>
                                        <div class='boxes box6 input'>
                                            <div class="boxes input-content">
                                                <div>Ore: <input type="number" name="ore" id="ore" placeholder="0"></div>
                                                <div>Minuti: <input type="number" name="minuti" id="minuti" placeholder="5"></div>
                                                <div>Secondi: <input type="number" name="secondi" id="secondi" placeholder="0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="list__difficulty">

                    <div class="mode-title">
                        <h1 class='typing'>Difficoltà</h1>
                    </div>
                    <div class="list">

                        <div class='label' id="d-principiante">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>🙂</div>
                                    <label for ="principiante">Principiante</label> 
                                    <input type="radio" name="difficolta" id="principiante" value="principiante" checked>
                                </div>    
                                <div class="label-back"> 
                                    <div class="descrizione">
                                        <div class='boxes box1'>Per chi è alle prime armi e vuole imparare le regole del gioco.</div>
                                        <div class="box2-border">
                                            <div class='boxes box2'>Larghezza: 9, Altezza: 9, Mine: 10</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='label' id="d-intermedio">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>😕</div>
                                    <label for ="intermedio">Intermedio</label>    
                                    <input type="radio" name="difficolta" id="intermedio" value="intermedio">
                                </div>    
                                <div class="label-back"> 
                                    <div class="descrizione">
                                        <div class='boxes box1'>Dimensioni contenute, ma utili per allenare le proprie tecniche.</div>
                                        <div class="box2-border">
                                            <div class='boxes box2'>Larghezza: 16, Altezza: 16, Mine: 40</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='label' id="d-avanzato">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>😤</div>
                                    <label for ="avanzato">Avanzato</label> 
                                    <input type="radio" name="difficolta" id="avanzato" value="avanzato">
                                </div>    
                                <div class="label-back">    
                                    <div class="descrizione">
                                        <div class='boxes box1'>Questo livello di difficoltà inizia a costituire una buona sfida.</div>
                                        <div class="box2-border">
                                            <div class='boxes box2'>Larghezza: 30, Altezza: 16, Mine: 99</div>
                                        </div> 
                                    </div> 
                                </div> 
                            </div>                            
                        </div>

                        <div class='label' id="d-superman">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>🦸🏽</div>
                                    <label for ="superman">Superman</label> 
                                    <input type="radio" name="difficolta" id="superman" value="superman">
                                </div>    
                                <div class="label-back">     
                                    <div class="descrizione">
                                        <div class='boxes box1'>Per chi ha padronanza del gioco... e un po' di tempo a disposizione.</div>
                                        <div class="box2-border">
                                            <div class='boxes box2'>Larghezza: 50, Altezza: 50, Mine: 500</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='label' id="d-extraterrestre">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>👽</div>
                                    <label for ="extraterrestre">Extraterrestre</label>    
                                    <input type="radio" name="difficolta" id="extraterrestre" value="extraterrestre">   
                                </div>    
                                <div class="label-back">     
                                    <div class="descrizione">
                                        <div class='boxes box1'>Grande sfida per chi vuol mettere alla prova nervi e pazienza.</div>
                                        <div class="box2-border">
                                            <div class='boxes box2'>Larghezza: 100, Altezza: 100, Mine: 2.000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='label' id="d-divino">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>😱</div>
                                    <label for ="divino">Divino</label>    
                                    <input type="radio" name="difficolta" id="divino" value="divino"> 
                                </div>    
                                <div class="label-back">      
                                    <div class="descrizione">
                                        <div class='boxes box1'>In bocca al lupo.</div>
                                        <div class="box2-border">
                                            <div class='boxes box2'>Larghezza: 250, Altezza: 210, Mine: 10.000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='label' id="d-personalizzato">
                            <div class="label-inner">
                                <div class="label-front">
                                    <div class='title-img'>💻</div>
                                    <label for ="personalizzato">Personalizzato</label>    
                                    <input type="radio" name="difficolta" id="personalizzato" value="personalizzato"> 
                                </div>    
                                <div class="label-back">      
                                    <div class="descrizione">
                                        <div class='boxes box1'>Imposta i parametri che preferisci per rendere unica la tua partita!</div>
                                        <div class='boxes box2' style='text-transform: uppercase'>Queste partite non sono classificate ma influiscono comunque sulle proprie statistiche.</div>
                                        <div class='boxes box3 input'>
                                            <div class="boxes input-content">
                                                <div>Larghezza: <input type="number" name="larghezza" id="larghezza" placeholder="10"></div>
                                                <div>Lunghezza: <input type="number" name="lunghezza" id="lunghezza" placeholder="10"></div>
                                                <div>Mine: <input type="number" name="mine" id="mine" placeholder="20"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class='list__button'>
                    <div class="pre-game-notify <?php if(!isset($_SESSION['username'])){echo 'notified';}?>">
                        <span class="notify-title">Attenzione!</span>
                        <span class="notify-text">Non avendo effettuato l'accesso, non potrai salvare i tuoi risultati.</span>
                    </div>
                    <button type="submit" class="send__button">INIZIA PARTITA!</button>
                </div>

                    </div>
                    
                </div>
                
            </form>

        </div>

        <script src="../js/newGame.js"></script>
        <script src="../js/audio.js"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>    
    

    </body>
    
</html>