-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: gmachsmalot
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `gowns`
--

DROP TABLE IF EXISTS `gowns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gowns` (
  `gownId` int NOT NULL AUTO_INCREMENT,
  `model` int NOT NULL,
  `sizeId` int NOT NULL,
  `lengthId` int NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`gownId`),
  UNIQUE KEY `id_UNIQUE` (`gownId`),
  KEY `model_idx` (`model`),
  KEY `size_idx` (`sizeId`),
  KEY `length_idx` (`lengthId`),
  CONSTRAINT `length` FOREIGN KEY (`lengthId`) REFERENCES `lengths` (`lengthId`),
  CONSTRAINT `model` FOREIGN KEY (`model`) REFERENCES `models` (`model`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `size` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`sizeId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gowns`
--

LOCK TABLES `gowns` WRITE;
/*!40000 ALTER TABLE `gowns` DISABLE KEYS */;
INSERT INTO `gowns` VALUES (1,316,18,1,2),(2,316,19,1,2),(3,316,20,1,6),(5,417,17,1,4),(6,417,18,1,5),(7,417,19,1,3),(8,316,21,1,4),(9,417,20,1,2),(10,316,22,1,2),(11,316,23,1,2),(14,606,1,1,1),(15,316,24,1,5),(16,316,25,1,4),(17,316,26,1,3),(18,316,27,1,4),(19,316,28,1,4),(20,417,21,1,4);
/*!40000 ALTER TABLE `gowns` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-25  0:11:15
