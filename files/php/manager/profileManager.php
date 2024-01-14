<?php

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/response.php';

// Recupero la connessione al database
$connection = (new Database)->getPDO();


/* FUNZIONE PER RECUPERARE LE STATISTICHE GENERALI DEL PROFILO */
function stats(){
    
    global $connection;

    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT sum(partiteGiocate) as partiteGiocate,
                   sum(partiteVinte) as partiteVinte,
                   sum(campiScoperti) as campiScoperti,
                   sum(obiettiviTrovati) as obiettiviTrovati
            FROM statistiche
            WHERE utente = :utente AND difficolta <> 'personalizzato';
        EMA
        );

        // Inserisco i dati
        $statement->bindParam('utente', $_SESSION['username']);
        
        // Eseguo la query
        $statement->execute();

        // Recupero i dati e invio una risposta a seconda che siano presenti o no
        $row = $statement->fetch();
        if ($row == null) {
            error('Non sono stati ritrovati i dati dell\'utente.');
        }
        success($row);

    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER RECUPERARE LE STATISTICHE DETTAGLIATE DEL PROFILO PER DIFFICOLTA' DI GIOCO */
function detailedStats(){
    
    global $connection;

    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT difficolta,
                   sum(partiteGiocate) as partiteGiocate,
                   sum(partiteVinte) as partiteVinte,
                   sum(campiScoperti) as campiScoperti,
                   sum(obiettiviTrovati) as obiettiviTrovati
            FROM statistiche
            WHERE utente = :utente
            GROUP BY difficolta
            ORDER BY indice;
        EMA
        );

        // Inserisco i dati
        $statement->bindParam('utente', $_SESSION['username']);

        // Eseguo la query
        $statement->execute();

        // Invio risposta positiva con la posizione trovata
        $row = $statement->fetchAll();
        if ($row == null) {
            error('Non sono stati ritrovati i dati dell\'utente.');
        }
        success($row);

    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


/* FUNZIONE PER AGGIORNARE I DATI DELLA CLASSIFICA DELLE PARTITE */
function lastGames($page, $dim){

    global $connection;
    
    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT data, modalita, difficolta, risultato, 
                   lunghezza as rows, larghezza as columns,
                   mine, ore, minuti, secondi, millesimi,
                   campiScoperti, obiettiviTrovati
            FROM storico
            WHERE utente = :utente
            ORDER BY data DESC
            LIMIT :dimension OFFSET :offset;
        EMA
        );

        // Inserisco i dati
        $statement->bindParam(':utente', $_SESSION['username']);
        $statement->bindValue(':dimension', intval($dim + 1, 10), \PDO::PARAM_INT);
        $statement->bindValue(':offset', intval($page * $dim, 10), \PDO::PARAM_INT);
        
        // Eseguo la query
        $statement->execute();
        
        // Recupero i dati e invio una risposta a seconda che siano presenti o no
        $row = $statement->fetchAll();
        if ($row == null) {
            error('Non sono ancora presenti dati');
        }
        // Specifico il numero di record recuperati oltre ai dati stessi
        success([$row, count($row)]);

    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}


?>