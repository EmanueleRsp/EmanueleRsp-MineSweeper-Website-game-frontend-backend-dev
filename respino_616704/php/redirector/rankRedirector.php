<?php
session_start();

// Includo le funzioni di gestione dei servizi
require_once __DIR__ . "/../manager/rankManager.php";

// Richieste di diverso tipo sono distinte per metodo (GET o POST) 
// e poi per "action", campo con il quale il client specifica la richiesta,
// la quale viene poi gestita dalla relativa funzione
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "GET":
        switch ($_GET['action']){
            case 'podium':
                podium($_GET['type']);
                break;
            case 'table':
                refreshTable($_GET['difficulty'], $_GET['page'], $_GET['dimension']);
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