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
  `colorId` int NOT NULL,
  `seasonId` int NOT NULL,
  `lengthId` int NOT NULL,
  `image` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `isInUse` tinyint DEFAULT '1',
  PRIMARY KEY (`model`),
  KEY `season_idx` (`seasonId`),
  KEY `color_idx` (`colorId`),
  KEY `length_idx` (`lengthId`),
  CONSTRAINT `color` FOREIGN KEY (`colorId`) REFERENCES `colors` (`colorId`),
  CONSTRAINT `length` FOREIGN KEY (`lengthId`) REFERENCES `lengths` (`lengthId`),
  CONSTRAINT `season` FOREIGN KEY (`seasonId`) REFERENCES `seasons` (`seasonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (316,1,1,1,'316.JPG',1),(332,9,2,1,'332.JPG',1),(401,2,2,1,'401.JPG',0),(417,10,2,1,'417.JPG',1),(426,2,2,1,'426.JPG',1),(514,23,1,1,'514.JPG',1),(518,10,1,1,'518.JPG',1),(606,2,3,1,'606.JPG',0),(607,4,3,1,'607.JPG',1),(609,10,3,1,'609.JPG',1),(610,13,3,1,'610.JPG',1),(612,10,1,4,'612.JPG',1),(613,23,1,1,'613.JPG',1),(615,3,2,1,'615.JPG',1),(616,23,2,1,'616.JPG',1),(617,3,2,1,'617.JPG',1),(618,2,1,1,'618.JPG',1),(621,2,1,1,'621.JPG',1),(622,11,1,1,'622.JPG',1),(625,23,2,1,'625.JPG',1),(626,23,2,1,'626.JPG',1),(627,13,2,1,'627.JPG',1);
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

-- Dump completed on 2024-07-16 18:39:03
