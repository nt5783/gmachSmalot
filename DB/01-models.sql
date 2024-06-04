-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: gmachsmalot
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `model` int NOT NULL,
  `color` varchar(45) NOT NULL,
  `season` varchar(45) NOT NULL,
  `womenImage` varchar(45) DEFAULT NULL,
  `girlsImage` varchar(45) DEFAULT NULL,
  `isInUse` tinyint DEFAULT '1',
  PRIMARY KEY (`model`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (111,'red','summer','https://via.placeholder.com/600/92c952','https://via.placeholder.com/600/771796',1),(222,'black','winter','https://via.placeholder.com/600/24f355',NULL,1),(333,'blue','yearRound','https://via.placeholder.com/600/d32776',NULL,1),(444,'pink','summer',NULL,'https://via.placeholder.com/600/f66b97',1),(555,'green','summer','https://via.placeholder.com/600/56a8c2',NULL,1),(666,'pink','summer',NULL,'https://via.placeholder.com/600/b0f7cc',1),(777,'black','summer','https://via.placeholder.com/600/54176f','https://via.placeholder.com/600/51aa97',0),(888,'blue','summer','https://via.placeholder.com/600/810b14',NULL,1),(999,'silver','summer','https://via.placeholder.com/600/1ee8a4','https://via.placeholder.com/600/66b7d2',1),(1111,'silver','winter','https://via.placeholder.com/600/197d29',NULL,1),(2222,'red','yearRound',NULL,'https://via.placeholder.com/600/61a65',1);
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-02 21:40:37
