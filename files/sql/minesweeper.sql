-- Progettazione Web 
DROP DATABASE if exists minesweeper; 
CREATE DATABASE minesweeper; 
USE minesweeper; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: minesweeper
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `statistiche`
--

DROP TABLE IF EXISTS `statistiche`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistiche` (
  `utente` varchar(20) NOT NULL,
  `difficolta` varchar(20) NOT NULL,
  `partiteGiocate` int(11) NOT NULL DEFAULT '0',
  `partiteVinte` int(11) NOT NULL DEFAULT '0',
  `partiteAbbandonate` int(11) NOT NULL DEFAULT '0',
  `campiScoperti` int(11) NOT NULL DEFAULT '0',
  `obiettiviTrovati` int(11) NOT NULL DEFAULT '0',
  `indice` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`utente`,`difficolta`),
  CONSTRAINT `statistiche_ibfk_1` FOREIGN KEY (`utente`) REFERENCES `utente` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistiche`
--

LOCK TABLES `statistiche` WRITE;
/*!40000 ALTER TABLE `statistiche` DISABLE KEYS */;
INSERT INTO `statistiche` VALUES ('ElBarto','avanzato',0,0,0,0,0,3),('ElBarto','divino',0,0,0,0,0,6),('ElBarto','extraterrestre',0,0,0,0,0,5),('ElBarto','intermedio',2,0,0,232,31,2),('ElBarto','personalizzato',0,0,0,0,0,7),('ElBarto','principiante',16,3,0,877,100,1),('ElBarto','superman',0,0,0,0,0,4),('ema','avanzato',0,0,0,0,0,3),('ema','divino',0,0,0,0,0,6),('ema','extraterrestre',0,0,0,0,0,5),('ema','intermedio',5,1,0,806,120,2),('ema','personalizzato',1,1,0,20,5,7),('ema','principiante',49,17,0,2800,282,1),('ema','superman',1,0,1,0,0,4),('LeBonWski','avanzato',2,0,0,404,65,3),('LeBonWski','divino',0,0,0,0,0,6),('LeBonWski','extraterrestre',0,0,0,0,0,5),('LeBonWski','intermedio',15,2,0,2076,287,2),('LeBonWski','personalizzato',8,6,1,200066,8,7),('LeBonWski','principiante',3,1,0,193,16,1),('LeBonWski','superman',0,0,0,0,0,4),('martifabia','avanzato',0,0,0,0,0,3),('martifabia','divino',0,0,0,0,0,6),('martifabia','extraterrestre',0,0,0,0,0,5),('martifabia','intermedio',0,0,0,0,0,2),('martifabia','personalizzato',0,0,0,0,0,7),('martifabia','principiante',0,0,0,0,0,1),('martifabia','superman',0,0,0,0,0,4),('Ross','avanzato',0,0,0,0,0,3),('Ross','divino',0,0,0,0,0,6),('Ross','extraterrestre',0,0,0,0,0,5),('Ross','intermedio',5,1,0,793,107,2),('Ross','personalizzato',0,0,0,0,0,7),('Ross','principiante',2,0,0,138,17,1),('Ross','superman',0,0,0,0,0,4);
/*!40000 ALTER TABLE `statistiche` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `storico`
--

DROP TABLE IF EXISTS `storico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storico` (
  `utente` varchar(20) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modalita` varchar(10) NOT NULL,
  `difficolta` varchar(20) NOT NULL,
  `risultato` varchar(20) NOT NULL DEFAULT 'Abbandonata',
  `lunghezza` int(11) NOT NULL DEFAULT '0',
  `larghezza` int(11) NOT NULL DEFAULT '0',
  `mine` int(11) NOT NULL DEFAULT '0',
  `ore` int(11) NOT NULL DEFAULT '0',
  `minuti` int(11) NOT NULL DEFAULT '0',
  `secondi` int(11) NOT NULL DEFAULT '0',
  `millesimi` int(11) NOT NULL DEFAULT '0',
  `campiScoperti` int(11) NOT NULL DEFAULT '0',
  `obiettiviTrovati` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`utente`,`data`),
  CONSTRAINT `storico_ibfk_1` FOREIGN KEY (`utente`) REFERENCES `utente` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storico`
--

LOCK TABLES `storico` WRITE;
/*!40000 ALTER TABLE `storico` DISABLE KEYS */;
INSERT INTO `storico` VALUES ('ElBarto','2023-06-02 12:17:57','classica','principiante','Abbandonata',9,9,10,0,0,0,0,0,0),('ElBarto','2023-06-02 14:04:02','classica','principiante','Sconfitta',9,9,10,0,0,19,900,68,8),('ElBarto','2023-06-02 14:04:08','classica','principiante','Sconfitta',9,9,10,0,0,3,450,10,2),('ElBarto','2023-06-02 14:04:19','classica','principiante','Sconfitta',9,9,10,0,0,8,500,32,4),('ElBarto','2023-06-02 14:04:34','classica','principiante','Sconfitta',9,9,10,0,0,12,100,67,8),('ElBarto','2023-06-02 14:04:52','classica','principiante','Sconfitta',9,9,10,0,0,15,350,63,6),('ElBarto','2023-06-02 14:05:02','classica','principiante','Sconfitta',9,9,10,0,0,4,100,54,4),('ElBarto','2023-06-02 14:05:24','classica','principiante','Sconfitta',9,9,10,0,0,20,950,66,7),('ElBarto','2023-06-02 14:05:42','classica','principiante','Vittoria',9,9,10,0,0,15,150,71,10),('ElBarto','2023-06-02 14:17:25','classica','intermedio','Sconfitta',16,16,40,0,1,40,100,149,24),('ElBarto','2023-06-02 14:17:44','classica','intermedio','Sconfitta',16,16,40,0,0,15,200,83,7),('ElBarto','2023-06-02 14:18:41','classica','principiante','Vittoria',9,9,10,0,0,27,400,71,10),('ElBarto','2023-06-02 14:19:01','classica','principiante','Sconfitta',9,9,10,0,0,16,450,67,8),('ElBarto','2023-06-02 14:19:06','classica','principiante','Sconfitta',9,9,10,0,0,2,750,45,2),('ElBarto','2023-06-02 14:19:29','classica','principiante','Sconfitta',9,9,10,0,0,21,150,70,9),('ElBarto','2023-06-02 14:19:39','classica','principiante','Sconfitta',9,9,10,0,0,8,550,55,6),('ElBarto','2023-06-02 14:19:54','classica','principiante','Sconfitta',9,9,10,0,0,13,250,67,6),('ElBarto','2023-06-02 14:20:14','classica','principiante','Vittoria',9,9,10,0,0,18,800,71,10),('ema','2023-04-30 00:54:10','classica','principiante','Sconfitta',9,9,10,0,0,1,650,39,0),('ema','2023-04-30 08:20:50','classica','principiante','Sconfitta',9,9,10,0,0,4,50,68,3),('ema','2023-04-30 18:33:57','classica','intermedio','Sconfitta',16,16,40,0,1,46,700,166,21),('ema','2023-04-30 23:21:12','classica','personalizzato','Vittoria',5,5,5,0,0,30,900,20,5),('ema','2023-05-01 00:15:03','classica','principiante','Vittoria',9,9,10,0,0,25,0,71,10),('ema','2023-05-01 21:50:17','classica','principiante','Sconfitta',9,9,10,0,0,10,150,55,3),('ema','2023-05-01 21:50:50','classica','principiante','Vittoria',9,9,10,0,0,25,250,71,10),('ema','2023-05-01 21:51:07','classica','principiante','Sconfitta',9,9,10,0,0,11,650,65,6),('ema','2023-05-01 21:51:11','classica','principiante','Sconfitta',9,9,10,0,0,1,900,47,1),('ema','2023-05-01 21:51:19','classica','principiante','Sconfitta',9,9,10,0,0,6,800,49,3),('ema','2023-05-01 21:51:44','classica','principiante','Sconfitta',9,9,10,0,0,22,0,65,9),('ema','2023-05-01 21:52:02','classica','principiante','Sconfitta',9,9,10,0,0,12,800,64,4),('ema','2023-05-01 21:52:12','classica','principiante','Sconfitta',9,9,10,0,0,7,400,60,4),('ema','2023-05-01 22:08:15','classica','principiante','Vittoria',9,9,10,0,0,54,950,71,10),('ema','2023-05-02 06:35:03','classica','principiante','Vittoria',9,9,10,0,1,12,800,71,10),('ema','2023-05-02 19:34:22','tempo','principiante','Vittoria',9,9,10,0,0,28,350,71,10),('ema','2023-05-02 21:45:01','classica','principiante','Sconfitta',9,9,10,0,0,36,150,57,6),('ema','2023-05-02 21:45:33','classica','principiante','Sconfitta',9,9,10,0,0,16,700,57,5),('ema','2023-05-02 21:46:41','classica','principiante','Vittoria',9,9,10,0,0,16,700,71,10),('ema','2023-05-02 21:50:05','classica','principiante','Sconfitta',9,9,10,0,0,10,300,28,1),('ema','2023-05-02 21:51:20','classica','principiante','Vittoria',9,9,10,0,0,29,200,71,10),('ema','2023-05-02 21:52:16','classica','principiante','Sconfitta',9,9,10,0,0,4,850,47,3),('ema','2023-05-02 21:52:55','classica','principiante','Sconfitta',9,9,10,0,0,26,250,47,5),('ema','2023-05-02 21:53:22','classica','principiante','Sconfitta',9,9,10,0,0,25,50,61,7),('ema','2023-05-02 21:53:30','classica','principiante','Sconfitta',9,9,10,0,0,3,700,46,4),('ema','2023-05-02 21:53:52','classica','principiante','Vittoria',9,9,10,0,0,20,50,71,10),('ema','2023-05-02 22:06:39','classica','principiante','Vittoria',9,9,10,0,0,28,150,71,10),('ema','2023-05-02 22:17:32','classica','principiante','Vittoria',9,9,10,0,0,28,950,71,10),('ema','2023-05-02 22:19:18','classica','principiante','Sconfitta',9,9,10,0,0,18,450,57,3),('ema','2023-05-02 22:19:44','classica','principiante','Vittoria',9,9,10,0,0,22,500,71,10),('ema','2023-05-06 13:12:24','classica','superman','Abbandonata',50,50,500,0,0,0,0,0,0),('ema','2023-05-06 13:15:49','classica','intermedio','Sconfitta',16,16,40,0,0,41,450,118,14),('ema','2023-05-06 13:18:21','classica','intermedio','Sconfitta',16,16,40,0,2,15,100,215,39),('ema','2023-05-06 13:18:50','classica','intermedio','Sconfitta',16,16,40,0,0,6,100,91,6),('ema','2023-05-06 13:22:09','classica','intermedio','Vittoria',16,16,40,0,3,14,0,216,40),('ema','2023-05-06 15:12:38','classica','principiante','Sconfitta',9,9,10,0,0,1,850,55,0),('ema','2023-05-06 15:12:51','classica','principiante','Sconfitta',9,9,10,0,0,1,300,33,0),('ema','2023-05-06 15:13:04','classica','principiante','Sconfitta',9,9,10,0,0,5,950,21,2),('ema','2023-05-06 15:14:00','classica','principiante','Sconfitta',9,9,10,0,0,38,600,68,8),('ema','2023-05-06 15:19:54','classica','principiante','Vittoria',9,9,10,0,0,59,50,71,10),('ema','2023-05-06 15:20:03','classica','principiante','Sconfitta',9,9,10,0,0,0,650,42,0),('ema','2023-05-06 15:20:15','classica','principiante','Sconfitta',9,9,10,0,0,0,850,32,0),('ema','2023-05-06 15:21:41','classica','principiante','Sconfitta',9,9,10,0,0,4,950,41,2),('ema','2023-06-02 08:59:07','classica','principiante','Sconfitta',9,9,10,0,0,4,750,51,4),('ema','2023-06-02 08:59:23','classica','principiante','Sconfitta',9,9,10,0,0,12,800,48,7),('ema','2023-06-02 08:59:57','classica','principiante','Vittoria',9,9,10,0,0,31,100,71,10),('ema','2023-06-02 09:02:59','classica','principiante','Vittoria',9,9,10,0,0,20,50,71,10),('ema','2023-06-02 09:04:56','classica','principiante','Sconfitta',9,9,10,0,0,5,300,38,4),('ema','2023-06-02 09:05:22','classica','principiante','Sconfitta',9,9,10,0,0,10,150,57,3),('ema','2023-06-02 09:05:28','classica','principiante','Sconfitta',9,9,10,0,0,2,900,52,4),('ema','2023-06-02 09:05:34','classica','principiante','Sconfitta',9,9,10,0,0,3,900,18,1),('ema','2023-06-02 09:05:55','classica','principiante','Sconfitta',9,9,10,0,0,19,300,64,7),('ema','2023-06-02 09:21:19','classica','principiante','Vittoria',9,9,10,0,0,27,500,71,10),('ema','2023-06-02 14:55:09','classica','principiante','Vittoria',9,9,10,0,0,20,300,71,10),('ema','2023-06-02 14:55:23','classica','principiante','Sconfitta',9,9,10,0,0,6,650,61,3),('ema','2023-06-02 14:55:38','classica','principiante','Vittoria',9,9,10,0,0,12,50,71,10),('LeBonWski','2023-05-02 08:45:23','classica','intermedio','Sconfitta',16,16,40,0,0,55,950,127,11),('LeBonWski','2023-05-02 08:46:07','classica','intermedio','Sconfitta',16,16,40,0,0,36,300,76,8),('LeBonWski','2023-05-09 08:48:11','classica','intermedio','Sconfitta',16,16,40,0,1,38,200,112,13),('LeBonWski','2023-05-09 09:54:53','classica','intermedio','Sconfitta',16,16,40,0,4,37,0,198,25),('LeBonWski','2023-05-09 09:55:44','classica','principiante','Sconfitta',9,9,10,0,0,12,800,56,3),('LeBonWski','2023-05-09 09:56:11','classica','principiante','Sconfitta',9,9,10,0,0,10,500,66,3),('LeBonWski','2023-05-09 10:02:31','classica','principiante','Vittoria',9,9,10,0,1,26,300,71,10),('LeBonWski','2023-05-16 08:40:24','classica','personalizzato','Abbandonata',100,100,1000,0,0,0,0,0,0),('LeBonWski','2023-05-16 10:06:37','classica','intermedio','Sconfitta',16,16,40,0,5,19,850,205,32),('LeBonWski','2023-05-16 10:09:13','classica','intermedio','Sconfitta',16,16,40,0,2,20,600,126,18),('LeBonWski','2023-05-16 10:09:44','classica','intermedio','Sconfitta',16,16,40,0,0,21,650,72,5),('LeBonWski','2023-05-16 10:11:56','classica','intermedio','Sconfitta',16,16,40,0,2,2,850,146,21),('LeBonWski','2023-05-16 10:12:07','classica','intermedio','Sconfitta',16,16,40,0,0,2,850,12,0),('LeBonWski','2023-05-16 10:18:59','classica','intermedio','Sconfitta',16,16,40,0,6,42,650,215,39),('LeBonWski','2023-05-16 10:19:38','classica','personalizzato','Vittoria',100,100,1,0,0,0,0,9999,1),('LeBonWski','2023-05-16 10:20:28','classica','personalizzato','Vittoria',100,100,1,0,0,0,0,9999,1),('LeBonWski','2023-05-16 10:21:56','classica','personalizzato','Vittoria',100,100,1,0,0,0,0,9999,1),('LeBonWski','2023-05-16 10:26:52','classica','personalizzato','Vittoria',400,400,1,0,0,24,700,159999,1),('LeBonWski','2023-05-16 10:29:32','classica','personalizzato','Vittoria',100,100,1,0,0,0,0,9999,1),('LeBonWski','2023-05-16 10:30:39','classica','personalizzato','Vittoria',5,5,1,0,0,0,0,24,1),('LeBonWski','2023-05-16 10:39:20','classica','personalizzato','Sconfitta',10,10,10,0,0,3,550,47,2),('LeBonWski','2023-05-16 10:42:52','classica','intermedio','Sconfitta',16,16,40,0,0,59,900,142,16),('LeBonWski','2023-05-16 10:44:03','classica','intermedio','Sconfitta',16,16,40,0,1,4,950,145,14),('LeBonWski','2023-05-16 10:44:58','classica','intermedio','Sconfitta',16,16,40,0,0,49,350,68,5),('LeBonWski','2023-05-16 10:51:29','classica','intermedio','Vittoria',16,16,40,0,6,25,600,216,40),('LeBonWski','2023-05-16 10:56:49','classica','intermedio','Vittoria',16,16,40,0,4,51,400,216,40),('LeBonWski','2023-05-16 11:01:51','classica','avanzato','Sconfitta',16,30,99,0,4,18,400,263,43),('LeBonWski','2023-05-16 11:04:08','classica','avanzato','Sconfitta',16,30,99,0,2,3,550,141,22),('Ross','2023-05-18 13:17:02','classica','intermedio','Sconfitta',16,16,40,0,2,22,0,106,10),('Ross','2023-05-18 13:19:14','classica','intermedio','Sconfitta',16,16,40,0,1,30,600,139,12),('Ross','2023-05-18 15:25:11','classica','intermedio','Sconfitta',16,16,40,0,7,24,650,195,30),('Ross','2023-05-18 15:29:21','classica','intermedio','Sconfitta',16,16,40,0,2,52,550,137,15),('Ross','2023-05-18 15:39:44','classica','intermedio','Vittoria',16,16,40,0,9,20,800,216,40),('Ross','2023-05-18 15:41:47','classica','principiante','Sconfitta',9,9,10,0,1,30,750,68,8),('Ross','2023-05-18 15:43:00','classica','principiante','Sconfitta',9,9,10,0,1,3,100,70,9);
/*!40000 ALTER TABLE `storico` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER nuovaPartita
BEFORE INSERT ON storico
FOR EACH ROW 
BEGIN 

	SET NEW.risultato = 'Abbandonata';

	UPDATE statistiche
    SET partiteGiocate = partiteGiocate + 1, partiteAbbandonate = partiteAbbandonate + 1
    WHERE utente = NEW.utente AND difficolta = NEW.difficolta;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER partitaTerminata
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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utente` (
  `username` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `domanda` varchar(60) DEFAULT NULL,
  `risposta` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES ('ElBarto','$2y$10$DUbRkjaGKsF19zdALpSlKuxYd6ZoU/wIHSjmM/pRk6bLZSsi75pp6','elbarto@gmail.com','$2y$10$/AUU8VQVx/TQeiItmj4m1eW3dV7drbw7V2OMjrAFeiZjHZHgt.y3W','$2y$10$cy5ihs4MN1bOZtifyWSoB.zSB68oXfdmq8WjRKJWImMC4p8HRE3by'),('ema','$2y$10$2FyvwcVXSqI6HHHqR.mqmemsUruZ9eaC.0OZn7fDeGSL43i0jlzQ2','ema@ema.ema','$2y$10$GzvIiO6tPMRr1n3K9Vxy1OjqIaFASQ7jNDvJ8Sn84hw5UmpKlBkoq','$2y$10$drpYglAvkp.4JJSuFIWfWeZak9rccPXTW/zxKxkag5xmLJFVR8T2C'),('LeBonWski','$2y$10$5G4pLbX0EBVG2TVyls/YC.mYFAPIzlnk9I2EMY.QDYoJL8CVaodoq','fala@gmail.com','$2y$10$GzvIiO6tPMRr1n3K9Vxy1OjqIaFASQ7jNDvJ8Sn84hw5UmpKlBkoq','$2y$10$9LFsZJfKApSRNS69LNYqmurJDMcZGGiX0QywcnmXRoQRRQ4cybfg.'),('martifabia','$2y$10$q7qsppOdrFTLnhxcKbmDtOiGf37Vl4Xlei0z1rwz2BH/8ZVAcsFVW','marti@gmail.it','$2y$10$GzvIiO6tPMRr1n3K9Vxy1OjqIaFASQ7jNDvJ8Sn84hw5UmpKlBkoq','$2y$10$OKSbG/cRsyltemKAwyoeJe4oNIw0GQRMV/L/qDW74GizccHk/.QmK'),('Ross','$2y$10$E8Inb9TI8zHJnJ89NNPcWOlf5AAOeh.n9ohomrnU/yO2geunx8MQe','rossana@gmail.com','$2y$10$GzvIiO6tPMRr1n3K9Vxy1OjqIaFASQ7jNDvJ8Sn84hw5UmpKlBkoq','$2y$10$9LFsZJfKApSRNS69LNYqmurJDMcZGGiX0QywcnmXRoQRRQ4cybfg.');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER inizializzaStatistiche
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

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-02 17:26:43
