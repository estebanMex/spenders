-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: spenders
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

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
-- Current Database: `spenders`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `spenders` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `spenders`;

--
-- Table structure for table `budgets`
--

DROP TABLE IF EXISTS `budgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `amount` float DEFAULT NULL,
  `status` varchar(2) NOT NULL DEFAULT 'OK',
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budgets`
--

LOCK TABLES `budgets` WRITE;
/*!40000 ALTER TABLE `budgets` DISABLE KEYS */;
INSERT INTO `budgets` VALUES (1,'budget Fevrier 2016',2800,'OK','2016-01-01 00:00:00','2016-01-31 00:00:00','0000-00-00 00:00:00',NULL),(2,'fevrier 2016',2800,'OK','2016-01-01 00:00:00','2016-01-31 00:00:00','2016-01-27 23:01:00',NULL);
/*!40000 ALTER TABLE `budgets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datalines`
--

DROP TABLE IF EXISTS `datalines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datalines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `tag` varchar(50) DEFAULT NULL,
  `type_line` varchar(20) NOT NULL,
  `amount` float NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datalines`
--

LOCK TABLES `datalines` WRITE;
/*!40000 ALTER TABLE `datalines` DISABLE KEYS */;
INSERT INTO `datalines` VALUES (8,'gaz','depense maison','debit',1000,'2016-01-23 17:01:10',NULL),(10,'salario','esteban','credit',300,'2016-01-23 17:01:10',NULL),(11,'sdcsdcsd','qscqsc','debit',22,'0000-00-00 00:00:00',NULL),(12,'svcqs','SSDVSV','debit',33,'0000-00-00 00:00:00',NULL),(13,'UNE AUTRE','SDVSDV','credit',33,'0000-00-00 00:00:00',NULL),(14,'DDD','DDDD','credit',11,'2016-01-24 17:01:47',NULL),(15,'SSS','DDD','credit',111,'2016-01-24 17:01:47',NULL),(16,'VFDVFVF','sdvdfb','debit',334,'2016-01-24 17:01:47',NULL),(17,'sdsd','sdcsdcv','debit',333,'2016-01-24 17:01:59',NULL);
/*!40000 ALTER TABLE `datalines` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-28  1:32:56
