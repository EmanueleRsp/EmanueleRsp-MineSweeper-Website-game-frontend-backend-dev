<?php
session_start();

// Includo le funzioni di gestione dei servizi
require_once __DIR__ . "/../manager/gameManager.php";

// Se non loggato non vengono salvate le statistiche della partita
if(!isset($_SESSION['username']))
    error('Attenzione, non essendo loggato non sarà possibile salvare le statistiche della partita.');    

// Richieste di diverso tipo sono distinte per metodo (GET o POST) 
// e poi per "action", campo con il quale il client specifica la richiesta,
// la quale viene poi gestita dalla relativa funzione
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "POST":
        switch ($_POST['action']){
            case 'stop':
                stopGame($_POST['date'], $_POST['result'], $_POST['ore'], $_POST['minuti'], $_POST['secondi'], $_POST['millesimi'], $_POST['campiScoperti'], $_POST['obiettiviTrovati']);
                break;
            default:
                http_response_code(400);
                break;
        }
        break;

    case "GET":
        switch ($_GET['action']){
            case 'start':
                startGame($_GET['date'], $_GET['difficulty'], $_GET['mode'], $_GET['rows'], $_GET['columns'], $_GET['mines']);
                break;
                case 'record':
                    checkRecord($_GET['difficolta'], $_GET['ore'], $_GET['minuti'], $_GET['secondi'], $_GET['millesimi']);
                    break;
            default:
                http_response_code(400);
                break;
            }
            break;
    
    default:
    http_response_code(400);
    break;
}

?>