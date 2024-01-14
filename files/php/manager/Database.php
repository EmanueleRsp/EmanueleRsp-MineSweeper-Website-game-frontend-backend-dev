<?php

/* CLASSE UTILIZZATA PER CREARE LA CONNESSIONE AL DATABASE*/
class Database{
    private static $pdo;

    // Se non è stata ancora creata la connessione viene generata
    function __construct(){
        if(self::$pdo == null){

            // I parametri del database (nome, utente, password) sono mantenuti in un file .json apposito
            $params = json_decode(file_get_contents(__DIR__ . '\..\..\json\DBcredentials.json'), true);
            
            self::$pdo = new PDO($params['dbConn'], $params['user'], $params['password']);

        }
    }

    // Chiude la connessione
    function __destruct(){
        self::$pdo = null;
    }

    // Restituisce l'oggetto di tipo PDO per connettersi al db
    function getPDO(){
        return self::$pdo;
    }
}

?>