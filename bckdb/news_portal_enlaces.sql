CREATE DATABASE  IF NOT EXISTS `news_portal` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `news_portal`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: news_portal
-- ------------------------------------------------------
-- Server version	5.7.21-log

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
-- Table structure for table `enlaces`
--

DROP TABLE IF EXISTS `enlaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enlaces` (
  `id_enlace_e` int(11) NOT NULL AUTO_INCREMENT,
  `enlace_e` varchar(255) NOT NULL,
  `titulo_e` varchar(100) NOT NULL,
  `descripcion_e` varchar(255) DEFAULT NULL,
  `id_categoria_e` int(11) NOT NULL DEFAULT '1',
  `id_usuario_e` int(11) NOT NULL DEFAULT '1',
  `fcreacion_e` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_enlace_e`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enlaces`
--

LOCK TABLES `enlaces` WRITE;
/*!40000 ALTER TABLE `enlaces` DISABLE KEYS */;
INSERT INTO `enlaces` VALUES (1,'https://www.google.com','Buscador Google','Buscador general de internet',3,2,'2018-02-04 17:45:38'),(2,'https://www.yahoo.com','Buscador Yahoo','Buscador general de internet',3,2,'2018-02-04 17:45:38'),(3,'https://www.youtube.com/watch?v=0ik6X4DJKCc','JavaScript DOM Crash Course - Part 1',NULL,15,2,'2018-02-13 16:45:47'),(4,'https://www.youtube.com/watch?v=e-5obm1G_FY','Anjana Vakil: Learning Functional Programming with JavaScript - JSUnconf 2016',NULL,15,2,'2018-02-13 17:22:56'),(5,'https://www.youtube.com/watch?v=NsQ2QIrQShU','Async/Await: Modern Concurrency In JavaScript',NULL,15,2,'2018-02-13 17:31:48'),(6,'https://www.w3schools.com/css/','w3schools - CSS Tutorial',NULL,5,2,'2018-02-19 19:21:27'),(7,'https://developer.mozilla.org/es/docs/Web/CSS','MDN Web Docs - CSS',NULL,5,2,'2018-02-19 19:21:27'),(8,'https://blog.risingstack.com/mastering-async-await-in-nodejs/','Mastering Async Await in Node.js',NULL,11,2,'2018-04-01 15:04:56'),(9,'https://medium.com/@adam.wasserman','Adam Zachary Wasserman - IT Strategist, startup positioner, cargo cult programmer',NULL,1,2,'2018-04-01 15:36:44'),(10,'https://www.nodexplained.com/','NODE.JS TUTORIAL SERIES',NULL,11,2,'2018-04-01 16:35:29'),(11,'https://nemethgergely.com/async-function-best-practices/','Node.js Async Function Best Practices',NULL,11,2,'2018-04-01 16:37:18'),(12,'http://2ality.com/2018/04/async-iter-nodejs.html','Using async iteration natively in Node.js',NULL,11,2,'2018-04-01 16:50:24'),(13,'https://nodejs.org/en/','Node.js',NULL,11,2,'2018-04-01 17:16:28'),(14,'https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359','Starting with Authentication (A tutorial with Node.js and MongoDB)',NULL,11,2,'2018-04-01 17:27:11'),(15,'http://www.oodlestechnologies.com/blogs/How-to-use-Google-Authentication-App-for-authentication-in-Node-Js','How to use Google Authentication App for authentication in Node Js',NULL,11,2,'2018-04-01 17:37:28'),(16,'http://www.thesaurus.com/','thesaurus',NULL,12,2,'2018-04-03 17:26:18'),(17,'http://www.dictionary.com/','dictionary',NULL,12,2,'2018-04-03 17:27:44'),(18,'https://www.linguee.es/','linguee',NULL,12,2,'2018-04-03 17:29:04'),(19,'https://www.spellzone.com/','Online spelling english resources',NULL,13,2,'2018-04-03 17:34:58'),(20,'http://conjugator.reverso.net/conjugation-english.html','TRANSLATION DICTIONARY SPELL CHECK CONJUGATION GRAMMAR',NULL,14,2,'2018-04-03 17:39:29'),(21,'https://dictionary.cambridge.org/dictionary/english/','Cambridge dictionary',NULL,12,2,'2018-04-03 17:44:30'),(22,'https://www.learning-english-online.net/','Learning english online',NULL,13,2,'2018-04-03 17:45:47'),(23,'https://www.usingenglish.com/','Using english',NULL,14,2,'2018-04-03 17:54:16'),(24,'http://www.wordreference.com/','Wordreference',NULL,12,2,'2018-04-03 17:58:41'),(25,'http://www.bbc.co.uk/learningenglish/','BBC Learning English',NULL,13,2,'2018-04-03 18:11:10'),(26,'http://apprendre.tv5monde.com/','TV5 Monde',NULL,10,2,'2018-04-03 18:14:48'),(27,'http://www.bbc.co.uk/languages/french/','BBC Learning French',NULL,10,2,'2018-04-03 18:19:20'),(28,'https://savoirs.rfi.fr/','Les clés pour comprendre le monde en français',NULL,10,2,'2018-04-03 20:42:52'),(29,'http://fr.euronews.com/','France Euronews',NULL,10,2,'2018-04-03 21:06:16'),(30,'https://www.francetvinfo.fr/','France TV info',NULL,10,2,'2018-04-03 21:16:29'),(31,'http://www.francetelevisions.fr/','France Televisions',NULL,10,2,'2018-04-03 21:18:55'),(32,'http://www.france24.com','France 24',NULL,10,2,'2018-04-03 21:22:00'),(33,'https://www.w3resource.com/','Web development tutorials',NULL,2,2,'2018-04-04 16:36:41'),(34,'https://en.wikibooks.org/wiki/SQL_Exercises/The_Hospital','SQL Exercices - The Hospital',NULL,36,2,'2018-04-04 16:48:06');
/*!40000 ALTER TABLE `enlaces` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-05 19:28:41
