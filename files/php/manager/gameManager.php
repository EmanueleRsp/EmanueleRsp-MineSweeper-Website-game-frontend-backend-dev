<?php

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/response.php';

// Recupero la connessione al database
$connection = (new Database)->getPDO();


/* FUNZIONE PER INSERIRE UNA NUOVA PARTITA INIZIATA */
function startGame($date, $difficulty, $mode, $rows, $columns, $mines){
    
    global $connection;
    
    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            INSERT INTO storico (utente, data, modalita, difficolta, lunghezza, larghezza, mine)
            VALUES (:utente, :data, :modalita, :difficolta, :lunghezza, :larghezza, :mine);
        EMA
        );

        // Inserisco i dati
        $statement->bindParam(':utente', $_SESSION['username']);
        $statement->bindParam(':data', $date);
        $statement->bindParam(':modalita', $mode);
        $statement->bindParam(':difficolta', $difficulty);
        $statement->bindParam(':lunghezza', $rows);
        $statement->bindParam(':larghezza', $columns);
        $statement->bindParam(':mine', $mines);

        // Eseguo la query
        $statement->execute();

        // Invio risposta positiva
        success();
    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER AGGIORNARE I DATI DI UNA PARTITA AL SUO TERMINE */
function stopGame($date, $result, $ore, $minuti, $secondi, $millesimi, $campiScoperti, $obiettiviTrovati){

    global $connection;
    
    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            UPDATE storico
            SET risultato = :result, ore = :ore, minuti = :minuti, secondi = :secondi, millesimi = :millesimi, campiScoperti = :campiScoperti, obiettiviTrovati = :obiettiviTrovati
            WHERE utente = :utente AND data = :data;
        EMA
        );

        // Inserisco i dati
        $statement->bindParam(':utente', $_SESSION['username']);
        $statement->bindParam(':data', $date);

        $statement->bindParam(':result', $result);

        $statement->bindParam(':ore', $ore);
        $statement->bindParam(':minuti', $minuti);
        $statement->bindParam(':secondi', $secondi);
        $statement->bindParam(':millesimi', $millesimi);

        $statement->bindParam(':campiScoperti', $campiScoperti);
        $statement->bindParam(':obiettiviTrovati', $obiettiviTrovati);

        // Eseguo la query
        $statement->execute();

        // Invio risposta positiva
        success();
    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER VERIFICARE IL POSIZIONAMENTO IN CLASSIFICA IN CASO DI VITTORIA */
function checkRecord($difficolta, $ore, $minuti, $secondi, $millesimi){

    global $connection;
    
    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT COUNT(*) as posizione
            FROM storico
            WHERE difficolta = :difficolta AND risultato = 'Vittoria' AND (
                  ore < :ore OR 
                 (ore = :ore AND minuti < :minuti) OR
                 (ore = :ore AND minuti = :minuti AND secondi < :secondi) OR
                 (ore = :ore AND minuti = :minuti AND secondi = :secondi AND millesimi < :millesimi));
        EMA
        );

        // Inserisco i dati
        $statement->bindParam(':utente', $_SESSION['username']);
        $statement->bindParam(':difficolta', $difficolta);
        $statement->bindParam(':ore', $ore);
        $statement->bindParam(':minuti', $minuti);
        $statement->bindParam(':secondi', $secondi);
        $statement->bindParam(':millesimi', $millesimi);

        // Eseguo la query
        $statement->execute();

        // Invio risposta positiva con la posizione trovata
        $row = $statement->fetch();
        success($row);
    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}

?>