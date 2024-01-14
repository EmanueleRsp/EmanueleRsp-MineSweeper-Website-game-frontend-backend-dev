-- ==================================================================== --
--       SCRIPT PER LA CREAZIONE DEL DATABASE 'minesweeper'  		--
-- ==================================================================== --
-- 
-- DESCRIZIONE STRUTTURA E COMPOSIZIONE
-- 
-- Sono presenti 3 tabelle:
-- 	utente -> memorizza le informazioni di accesso dell'utente 
--  	    (username, password ed email);
--  storico -> memorizza le informazioni sulle partite: quando il gioco
--  		inizia viene inserito con stato 'partita abbandonata' e
--  		a fine partita viene eseguito l'update di tale record
-- 			con i giusti valori;
--  statistiche -> mantiene informazioni generali su ciascun utente
-- 			(partite giocate, partite vinte...) per ogni difficoltà di
-- 			gioco.
-- 
-- Sono presenti due trigger: uno (nuovaPartita) inizializza il record
-- di una nuova partita quando viene aggiunto e uno (partitaTerminata)
-- per quando viene aggiornato con il risultato: si occupa di
-- mantenere aggiornate le informazioni riguardanti le statistiche.
-- E' presente un terzo trigger (inizializzaStatistiche) che inizializza
-- le statistiche di un nuovo giocatore.
-- ==================================================================== --



SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS minesweeper;
CREATE DATABASE minesweeper; 
USE minesweeper;



-- ------------------------------ --
--  Table structure for `utente`  --
-- ------------------------------ --
DROP TABLE IF EXISTS utente;
CREATE TABLE utente (

	username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    
    email VARCHAR(100) NOT NULL UNIQUE,
    
    domanda VARCHAR(60) NOT NULL,
    risposta VARCHAR(60) NOT NULL,
    
    PRIMARY KEY(username)
    
)ENGINE = InnoDB DEFAULT CHARSET = latin1;



-- ------------------------------- --
--  Table structure for `storico`  --
-- ------------------------------- --
DROP TABLE IF EXISTS storico;
CREATE TABLE storico (
    
    utente VARCHAR(20) NOT NULL,
    data TIMESTAMP NOT NULL,
    
    modalita VARCHAR(10) NOT NULL,
    difficolta VARCHAR(20) NOT NULL,
    risultato VARCHAR(20) NOT NULL DEFAULT 'Abbandonata',
    
    lunghezza INTEGER NOT NULL DEFAULT 0,
    larghezza INTEGER NOT NULL DEFAULT 0,
    mine INTEGER NOT NULL DEFAULT 0,
    
    ore INTEGER NOT NULL DEFAULT 0,
    minuti INTEGER NOT NULL DEFAULT 0,
    secondi INTEGER NOT NULL DEFAULT 0,
    millesimi INTEGER NOT NULL DEFAULT 0,
    
    campiScoperti INTEGER NOT NULL DEFAULT 0,
    obiettiviTrovati INTEGER NOT NULL DEFAULT 0,
    
    PRIMARY KEY(utente, data),
    FOREIGN KEY(utente) REFERENCES utente(username) ON DELETE CASCADE
    
)ENGINE = InnoDB DEFAULT CHARSET = latin1;




-- ----------------------------------- --
--  Table structure for `statistiche`  --
-- ----------------------------------- --
DROP TABLE IF EXISTS statistiche;
CREATE TABLE statistiche (
    
    utente VARCHAR(20) NOT NULL,
    difficolta VARCHAR(20) NOT NULL,
    
    partiteGiocate INTEGER NOT NULL DEFAULT 0,
    partiteVinte INTEGER NOT NULL DEFAULT 0,
    partiteAbbandonate INTEGER NOT NULL DEFAULT 0,
    campiScoperti INTEGER NOT NULL DEFAULT 0,
    obiettiviTrovati INTEGER NOT NULL DEFAULT 0,
    
    indice INTEGER NOT NULL DEFAULT 0,
    
    PRIMARY KEY(utente, difficolta),
    FOREIGN KEY(utente) REFERENCES utente(username) ON DELETE CASCADE
    
)ENGINE = InnoDB DEFAULT CHARSET = latin1;



-- -------------------------------------- --
--  Trigger for `inizializzaStatistiche`  --
-- -------------------------------------- --
DROP TRIGGER IF EXISTS inizializzaStatistiche;
DELIMITER $$
CREATE TRIGGER inizializzaStatistiche
AFTER INSERT ON utente
FOR EACH ROW 
BEGIN 

	INSERT INTO statistiche (utente, difficolta, indice)
    VALUES (NEW.username, 'principiante', 1),
		   (NEW.username, 'intermedio', 2),
           (NEW.username, 'avanzato', 3),
           (NEW.username, 'superman', 4),
		   (NEW.username, 'extraterrestre', 5),
		   (NEW.username, 'divino', 6),
		   (NEW.username, 'personalizzato', 7);

END $$
DELIMITER ;



-- ---------------------------- --
--  Trigger for `nuovaPartita`  --
-- ---------------------------- --
DROP TRIGGER IF EXISTS nuovaPartita;
DELIMITER $$
CREATE TRIGGER nuovaPartita
BEFORE INSERT ON storico
FOR EACH ROW 
BEGIN 

	SET NEW.risultato = 'Abbandonata';

	UPDATE statistiche
    SET partiteGiocate = partiteGiocate + 1, partiteAbbandonate = partiteAbbandonate + 1
    WHERE utente = NEW.utente AND difficolta = NEW.difficolta;

END $$
DELIMITER ;




-- -------------------------------- --
--  Trigger for `partitaTerminata`  --
-- -------------------------------- --
DROP TRIGGER IF EXISTS partitaTerminata;
DELIMITER $$
CREATE TRIGGER partitaTerminata
AFTER UPDATE ON storico
FOR EACH ROW 
BEGIN 

	IF NEW.risultato = 'vittoria' THEN
		UPDATE statistiche
		SET partiteAbbandonate = partiteAbbandonate - 1, partiteVinte = partiteVinte + 1, campiScoperti = campiScoperti + NEW.campiScoperti, obiettiviTrovati = obiettiviTrovati + NEW.obiettiviTrovati
		WHERE utente = NEW.utente AND difficolta = NEW.difficolta;
	ELSE			
		UPDATE statistiche
		SET partiteAbbandonate = partiteAbbandonate - 1, campiScoperti = campiScoperti + NEW.campiScoperti, obiettiviTrovati = obiettiviTrovati + NEW.obiettiviTrovati
		WHERE utente = NEW.utente AND difficolta = NEW.difficolta;
	END IF;

END $$
DELIMITER ;