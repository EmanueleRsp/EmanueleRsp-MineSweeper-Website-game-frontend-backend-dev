<?php

// MESSAGGIO DI RISPOSTA POSITIVO
function success($message = ''){
    echo json_encode(array("error" => 0, "message" => $message));
    die();
}

// MESSAGGIO DI RISPOSTA NEGATIVO
function error($type){
    echo json_encode(array("error" => $type, "message" => ""));
    die();
}

?>