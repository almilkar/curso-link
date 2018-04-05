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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id_categoria_c` int(11) NOT NULL AUTO_INCREMENT,
  `nivel_c` int(11) NOT NULL,
  `titulo_c` varchar(50) NOT NULL,
  `descripcion_c` text,
  `id_usuario_c` int(11) NOT NULL DEFAULT '1',
  `fcreacion_c` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prede_c` int(11) NOT NULL,
  `predetit_c` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_categoria_c`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,1,'Temporal','Categoría indefinida temporal',2,'2018-02-04 17:45:38',0,NULL),(2,1,'Programación Web','Lenguajes y entornos de programacion',2,'2018-02-04 17:45:38',0,NULL),(3,1,'Buscador General','Buscador general en internet',2,'2018-02-06 17:23:27',0,NULL),(4,2,'Javascript','Javascript cliente, servidor, entornos',2,'2018-02-06 23:16:55',2,NULL),(5,2,'CSS','CSS',2,'2018-02-06 23:16:55',2,NULL),(6,2,'HTML5','HTML5',2,'2018-02-06 23:16:55',2,NULL),(7,2,'EJS','EJS',2,'2018-02-06 23:16:55',2,NULL),(8,2,'Bootstrap','Bootstrap',2,'2018-02-06 23:16:55',2,NULL),(9,1,'Ingles','Ingles',2,'2018-02-11 23:10:52',0,NULL),(10,1,'Frances','Frances',2,'2018-02-11 23:12:04',0,NULL),(11,2,'Node.js','Node.js',2,'2018-02-11 23:15:02',2,NULL),(12,2,'Diccionarios','Diccionarios',2,'2018-02-12 16:04:41',9,NULL),(13,2,'Portales','Portales',2,'2018-02-12 16:04:41',9,NULL),(14,2,'Aprendizaje','Aprendizaje',2,'2018-02-12 16:04:41',9,NULL),(15,3,'Videos','Videos',2,'2018-02-12 16:04:41',4,NULL),(16,3,'Blogs','Blogs',2,'2018-02-12 16:04:41',4,NULL),(17,3,'Tutoriales','Tutoriales',2,'2018-02-12 16:04:41',4,NULL),(18,1,'Software',NULL,2,'2018-03-18 17:22:13',0,NULL),(19,1,'Ofimática',NULL,2,'2018-03-18 17:28:44',0,NULL),(20,1,'Electricidad',NULL,2,'2018-03-18 17:35:01',0,NULL),(21,1,'Automatismos',NULL,2,'2018-03-18 17:36:59',0,NULL),(22,1,'Cocina y Alimentos',NULL,2,'2018-03-18 17:47:41',0,NULL),(23,1,'Prevención',NULL,2,'2018-03-18 17:51:42',0,NULL),(24,1,'Rutas',NULL,2,'2018-03-18 17:54:07',0,NULL),(25,1,'Turismo',NULL,2,'2018-03-19 10:00:38',0,NULL),(26,1,'Electrodomesticos',NULL,2,'2018-03-19 10:04:26',0,NULL),(27,1,'Meteorología',NULL,2,'2018-03-19 10:16:20',0,NULL),(28,1,'Astronomía',NULL,2,'2018-03-19 10:30:03',0,NULL),(29,2,'Sistema Solar',NULL,2,'2018-03-19 10:33:53',28,NULL),(30,3,'Planetas',NULL,2,'2018-03-19 17:37:03',29,NULL),(31,2,'Procesador de texto',NULL,2,'2018-03-20 09:50:13',19,NULL),(32,2,'Canal Youtube',NULL,2,'2018-03-20 12:13:23',9,NULL),(33,3,'Asteroides',NULL,2,'2018-03-20 16:59:12',29,NULL),(34,2,'Entornos de desarrollo',NULL,2,'2018-03-20 18:51:40',2,NULL),(35,1,'Bases de Datos',NULL,2,'2018-04-04 16:47:13',0,NULL),(36,2,'Relacionales',NULL,2,'2018-04-04 16:47:58',35,NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
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
