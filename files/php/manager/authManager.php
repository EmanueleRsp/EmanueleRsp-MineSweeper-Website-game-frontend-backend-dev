<?php

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/response.php';

// Recupero la connessione al database
$connection = (new Database)->getPDO();

// Definisco le RegExp per la convalida dei dati trasmessi
define('USR_REG', '/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/');
define('EMAIL_REG', '/^[a-zA-Z0-9._%+-]{1,48}@[a-zA-Z0-9.-]{1,48}\.[a-zA-Z]{2,4}$/');
define('PSW_REG', '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/');
define('ANS_REG', '/^(?=.{3,30}$)(?![\s])(?!.*[\s]{2})[a-zA-Z0-9\s]+(?<![\s])$/');


/* FUNZIONE PER EFFETTUARE IL LOGIN */
function login($email, $psw)
{
    global $connection;

    // Convalido dati inseriti
    if (!isset($email) || !isset($psw) || !preg_match(EMAIL_REG, $email) || !preg_match(PSW_REG, $psw)){
        error("Credenziali non inserite correttamente.");
    }

    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT u.password as password, u.username as username
            FROM utente u
            WHERE u.email = :email;
        EMA
        );

        // Inserisco i dati ed eseguo la query
        $statement->bindParam(":email", $email);
        $statement->execute();

        // Se l'email è registrata e le password coincidono allora creo la sessione per l'utente
        $row = $statement->fetch();
        if ($row != null && password_verify($psw, $row['password'])) {
            $_SESSION["username"] = $row['username'];
            success();
        }
        error("Email e/o password incorretti.");
    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER EFFETTUARE LA REGISTRAZIONE */
function register($username, $email, $psw, $securityAns, $securityQuest)
{
    global $connection;

    // Convalido dati inseriti
    if (!isset($username) || !isset($email) || !isset($psw) || !isset($securityAns) || !isset($securityQuest) ||
        !preg_match(USR_REG, $username) || !preg_match(EMAIL_REG, $email) || !preg_match(PSW_REG, $psw) || !preg_match(ANS_REG, $securityAns)){
        error("Credenziali non inserite correttamente.");
    }
    
    try{
        
        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT *
            FROM utente u
            WHERE u.email = :email OR u.username = :username;
        EMA
        );
        
        // Inserisco i dati ed eseguo la query
        $statement->bindParam(":email", $email);
        $statement->bindParam(":username", $username);
        $statement->execute();
        
        // Se l'email è già utilizzata rispondo con il relativo messaggio di errore
        if($statement->fetch() != null){
            error("Email e/o username già utilizzati.");
        }

        // Altrimenti cripto i dati sensibili e registro il nuovo utente
        $psw_hashed = password_hash($psw, PASSWORD_BCRYPT);
        $qst_hashed = password_hash($securityQuest, PASSWORD_BCRYPT);
        $ans_hashed = password_hash($securityAns, PASSWORD_BCRYPT);
        

        // Query di registrazione
        $stmt = $connection->prepare(<<<EMA
            INSERT INTO utente (username, password, email, domanda, risposta)
            VALUES (:username, :password, :email, :quest, :answer);
        EMA
        );

        // Dati di registrazione
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $psw_hashed);
        $stmt->bindParam(":quest", $qst_hashed);
        $stmt->bindParam(":answer", $ans_hashed);

        // Eseguo la query e segnalo esito positivo
        $stmt->execute();
        success();  

    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER IMPOSTARE UNA NUOVA PASSWORD */
function recovery($email, $psw, $securityQuest, $securityAns)
{
    global $connection;

    // Convalido dati inseriti
    if (!isset($email) || !isset($psw) || !isset($securityAns) || !isset($securityQuest) ||
        !preg_match(EMAIL_REG, $email) || !preg_match(PSW_REG, $psw) || !preg_match(ANS_REG, $securityAns)){
            error("Credenziali non inserite correttamente.");
    }
    
    try{
        
        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT *
            FROM utente u
            WHERE u.email = :email;
        EMA
        );

        // Inserisco i dati ed eseguo la query
        $statement->bindParam(":email", $email);
        $statement->execute();

        // Recupero i dati
        $row = $statement->fetch();
        
        // Se l'email non è registrata o le credenziali per il recupero non sono valide invio un messaggio di errore
        if($row == null){
            error("Email non registrata.");
        }
        if(!password_verify($securityQuest, $row['domanda']) || !password_verify($securityAns, $row['risposta'])){
            error("Domanda e/o risposta di sicurezza errate.");
        }

        // Altrimenti cripto la nuova password e la inserisco
        $psw_hashed = password_hash($psw, PASSWORD_BCRYPT);
        
        // Query per aggiornare la password
        $stmt = $connection->prepare(<<<EMA
            UPDATE utente 
            SET password = :password
            WHERE email = :email
        EMA
        );

        // Inserisco i dati ed eseguo la query
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $psw_hashed);
        $stmt->execute();

        // Invio risposta positiva
        success();    

    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER VERIFICARE DISPONIBILITA' EMAIL */
function emailCheck($email)
{
    global $connection;

    // Convalido dati inseriti
    if (!isset($email) || !preg_match(EMAIL_REG, $email)){
        error("Credenziali non inserite correttamente.");
    }
    
    try{
        
        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT *
            FROM utente u
            WHERE u.email = :email;
        EMA
        );
        
        // Inserisco i dati ed eseguo la query
        $statement->bindParam(":email", $email);
        $statement->execute();

        // Recupero i dati: se presenti invio un messaggio di errore 
        $row = $statement->fetch();
        if($row == null){
            success();    
        }
        error("Email gia' registrata.");

    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER VERIFICARE DISPONIBILITA' USERNAME */
function userCheck($user)
{
    global $connection;

    // Convalido dati inseriti
    if (!isset($user) || !preg_match(USR_REG, $user)){
        error("Credenziali non inserite correttamente.");
    }
    
    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT *
            FROM utente u
            WHERE u.username = :username;
        EMA
        );

        // Inserisco i dati
        $statement->bindParam(":username", $user);
        $statement->execute();

        // Recupero i dati: se presenti invio un messaggio di errore 
        $row = $statement->fetch();        
        if($row == null){
            success();    
        }
        error("Username gia' registrato.");

    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }
}


/* FUNZIONE PER LA DISCONNESSIONE DELL'UTENTE LOGGATO */
function logout()
{
    // Rimuovo tutte le variabili di sessione
    session_unset();

    // Terminazione della sessione
    session_destroy();

    // Invio risposta positiva
    success();
}

?>