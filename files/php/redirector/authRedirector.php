<?php
session_start();

// Includo le funzioni di gestione dei servizi
require_once __DIR__ . "/../manager/authManager.php";

// Richieste di diverso tipo sono distinte per metodo (GET o POST) 
// e poi per "action", campo con il quale il client specifica la richiesta,
// la quale viene poi gestita dalla relativa funzione
$method = $_SERVER['REQUEST_METHOD'];
switch($method){
    case "POST":
        switch ($_POST['action']){
            case 'login':
                login($_POST['email'], $_POST['password']);
                break;
            case 'register':
                register($_POST['username'], $_POST['email'], $_POST['password'], $_POST['securityAns'], $_POST['securityQuest']);
                break;
            case 'emailCheck':
                emailCheck($_POST['email']);
                break;
            case 'userCheck':
                userCheck($_POST['username']);
                break;
            case 'recovery':
                recovery($_POST['email'], $_POST['password'], $_POST['securityQuest'], $_POST['securityAns']);
                break;
            case 'logout':
                logout();
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