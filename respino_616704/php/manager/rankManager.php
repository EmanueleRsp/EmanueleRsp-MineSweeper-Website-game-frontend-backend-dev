<?php

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/response.php';

// Recupero la connessione al database
$connection = (new Database)->getPDO();


/* FUNZIONE PER RECUPERARE IL PODIO RELATIVO AD UNA STATISTICA (type) */
function podium($type){
    
    global $connection;

    try{

        // Preparo la query
        $statement = $connection->prepare("
            SELECT utente as user, sum(". $type .") as totale
            FROM statistiche
            WHERE difficolta <> 'personalizzato'
            GROUP BY utente
            ORDER BY totale DESC, utente
            LIMIT 3;
        "
        );

        // Eseguo la query
        $statement->execute();

        // Recupero i dati e invio una risposta a seconda che siano presenti o no
        $row = $statement->fetchAll();
        if ($row == null) {
            error('Non sono ancora presenti dati');
        }
        success($row);

    
    }catch(PDOException $e){
        // Invio risposta negativa specificando l'errore
        error($e->getMessage());
    }

}

/* FUNZIONE PER AGGIORNARE I DATI DELLA CLASSIFICA DELLE PARTITE */
function refreshTable($difficulty, $page, $dim){

    global $connection;
    
    try{

        // Preparo la query
        $statement = $connection->prepare(<<<EMA
            SELECT utente, modalita, ore, minuti, secondi, millesimi, data
            FROM storico
            WHERE difficolta = :difficulty AND risultato = 'vittoria'
            ORDER BY ore, minuti, secondi, millesimi, utente
            LIMIT :dimension OFFSET :offset;
        EMA
        );

        // Inserisco i dati
        $statement->bindParam(':difficulty', $difficulty);
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