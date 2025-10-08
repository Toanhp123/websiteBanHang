-- MySQL dump 10.13  Distrib 8.4.6, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: quanlycuahangckk
-- ------------------------------------------------------
-- Server version	8.4.6

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `account_type` enum('employee','customer') NOT NULL,
  `employee_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `role_id` int NOT NULL,
  `account_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'approved',
  `email` varchar(100) NOT NULL,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `employee_id` (`employee_id`),
  UNIQUE KEY `customer_id` (`customer_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `account_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `account_role` (`role_id`) ON DELETE RESTRICT,
  CONSTRAINT `account_ibfk_4` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (2,'toanpham','$2b$10$9blxuMpGU2x8X3761dax4ukgT5jED7shdybtlsVN/I.GXIidlKwKW','employee',1,NULL,1,'approved','toanpham12102003@gmail.com','2025-06-23 20:00:36'),(3,'toanhp2003','$2b$10$Yg.GbkIXJl7DdSHsC0SM2eBfIXl/0EXUv754yh5BvB392EG3f./ru','customer',NULL,2,3,'approved','toanhp12102003@gmail.com','2025-06-25 10:20:23'),(4,'tuanpham','$2b$10$dP3Mr/03GHwieD25Lwo.6OnZN.k0pa26aGwu/C.Qn0iGx98A5pBfy','customer',NULL,3,3,'approved','tuanngunhuconcho@gamil.com','2025-09-01 07:11:51'),(5,'tuansucsinh','$2b$10$lODhAbUDujjGIIVLlLrP.OxqrJA4DwmIebL5YonOUHt/5JoZWLHQW','employee',3,NULL,4,'approved','tuansucsinh@gmai.com','2025-09-09 10:07:46'),(6,'123456','$2b$10$3cZJqwF.WjsW/AaJvuPcfeVWEZb.cDVqxdW4j0ZhOz6YgxMoVwhce','employee',5,NULL,4,'rejected','1','2025-09-09 10:14:48');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;

--
-- Table structure for table `account_role`
--

DROP TABLE IF EXISTS `account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `role_description` text,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_role`
--

/*!40000 ALTER TABLE `account_role` DISABLE KEYS */;
INSERT INTO `account_role` VALUES (1,'Admin','Quản lý hệ thống'),(3,'Customer','khách hàng'),(4,'Employee','Nhân viên');
/*!40000 ALTER TABLE `account_role` ENABLE KEYS */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  `account_id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`category_id`),
  CONSTRAINT `blog_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'test','test','testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt','test','uploads/blog/test.jpg',3,1,'2025-08-31 09:04:52','2025-08-31 09:09:36','published'),(2,'téttt','test-2','ttttttttttttttttttttttttttttt','test','uploads/blog/test.jpg',3,2,'2025-08-31 09:07:11','2025-08-31 09:09:46','published');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;

--
-- Table structure for table `blog_categories`
--

DROP TABLE IF EXISTS `blog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_categories`
--

/*!40000 ALTER TABLE `blog_categories` DISABLE KEYS */;
INSERT INTO `blog_categories` VALUES (1,'Bánh mỳ','banh-my','Bài viết liên quan đến bánh mỳ'),(2,'Khuyến mãi','khuyen-mai','Bài viết liên quan đến khuyến mãi'),(3,'Đồ uống','do-uong','Bài viết liên quan đến đồ uống');
/*!40000 ALTER TABLE `blog_categories` ENABLE KEYS */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `create_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (68,3,'2025-09-11 15:30:44'),(92,2,'2025-09-25 17:06:48');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

--
-- Table structure for table `cart_product`
--

DROP TABLE IF EXISTS `cart_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_product` (
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  PRIMARY KEY (`cart_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_product`
--

/*!40000 ALTER TABLE `cart_product` DISABLE KEYS */;
INSERT INTO `cart_product` VALUES (92,13,1);
/*!40000 ALTER TABLE `cart_product` ENABLE KEYS */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `customer_type_id` int NOT NULL DEFAULT '1',
  `customer_birthday` date NOT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `customer_type_id` (`customer_type_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`customer_type_id`) REFERENCES `customer_type` (`customer_type_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (2,'Toàn','Phạm Tiến','12345678910',1,'2003-10-12'),(3,'tuan','pham','123456789011',1,'2025-09-01');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

--
-- Table structure for table `customer_promotion`
--

DROP TABLE IF EXISTS `customer_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_promotion` (
  `promotion_id` int NOT NULL,
  `all_customers` tinyint DEFAULT '0',
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`promotion_id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `customer_promotion_ibfk_2` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`) ON DELETE RESTRICT,
  CONSTRAINT `customer_promotion_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_promotion`
--

/*!40000 ALTER TABLE `customer_promotion` DISABLE KEYS */;
INSERT INTO `customer_promotion` VALUES (13,1,NULL),(16,1,NULL);
/*!40000 ALTER TABLE `customer_promotion` ENABLE KEYS */;

--
-- Table structure for table `customer_type`
--

DROP TABLE IF EXISTS `customer_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_type` (
  `customer_type_id` int NOT NULL AUTO_INCREMENT,
  `customer_type_name` varchar(10) NOT NULL,
  PRIMARY KEY (`customer_type_id`),
  UNIQUE KEY `customer_type_name` (`customer_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_type`
--

/*!40000 ALTER TABLE `customer_type` DISABLE KEYS */;
INSERT INTO `customer_type` VALUES (1,'bạc');
/*!40000 ALTER TABLE `customer_type` ENABLE KEYS */;

--
-- Table structure for table `damaged_good`
--

DROP TABLE IF EXISTS `damaged_good`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `damaged_good` (
  `damage_id` int NOT NULL AUTO_INCREMENT,
  `warehouse_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `reason` text NOT NULL,
  `report_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`damage_id`),
  KEY `warehouse_id` (`warehouse_id`),
  KEY `product_id` (`product_id`),
  KEY `reported_by` (`employee_id`),
  CONSTRAINT `damaged_good_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  CONSTRAINT `damaged_good_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `damaged_good_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `damaged_good`
--

/*!40000 ALTER TABLE `damaged_good` DISABLE KEYS */;
/*!40000 ALTER TABLE `damaged_good` ENABLE KEYS */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_first_name` varchar(50) NOT NULL,
  `employee_phone` varchar(15) NOT NULL,
  `employee_birthday` date NOT NULL,
  `employee_address` varchar(100) NOT NULL,
  `employee_hire_date` date NOT NULL,
  `employee_position_id` int NOT NULL,
  `employee_last_name` varchar(50) NOT NULL,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_phone` (`employee_phone`),
  KEY `employee_position_id` (`employee_position_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`employee_position_id`) REFERENCES `employee_position` (`employee_position_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'Toàn','0799230095','2003-10-12','Hải Phòng','2023-10-12',1,'Phạm Tiến',1),(3,'tuan','1','2003-12-28','trong xó','2025-09-09',2,'pham',1),(5,'1','12','2025-09-09','1','2025-09-09',2,'1',0);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

--
-- Table structure for table `employee_position`
--

DROP TABLE IF EXISTS `employee_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_position` (
  `employee_position_id` int NOT NULL AUTO_INCREMENT,
  `employee_position_name` varchar(50) NOT NULL,
  `employee_position_description` text,
  PRIMARY KEY (`employee_position_id`),
  UNIQUE KEY `employee_position_name` (`employee_position_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_position`
--

/*!40000 ALTER TABLE `employee_position` DISABLE KEYS */;
INSERT INTO `employee_position` VALUES (1,'Quản trị viên','Quản lý hệ thống'),(2,'Nhân viên',NULL);
/*!40000 ALTER TABLE `employee_position` ENABLE KEYS */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `product_id` int NOT NULL,
  `warehouse_id` int NOT NULL,
  `quantity` int DEFAULT '0',
  `last_checked_at` datetime NOT NULL,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`product_id`,`warehouse_id`),
  KEY `warehouse_id` (`warehouse_id`),
  CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  CONSTRAINT `inventory_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,1,91,'2025-08-23 22:06:02',1),(1,2,100,'2025-08-24 09:59:24',0),(1,8,0,'2025-09-17 03:48:38',1),(2,1,98,'2025-08-23 22:07:21',1),(2,8,0,'2025-09-17 03:48:38',1),(3,2,97,'2025-09-03 17:04:04',0),(3,8,0,'2025-09-17 03:48:38',1),(6,1,1,'2025-09-06 05:09:59',1),(6,2,2,'2025-09-06 05:09:59',0),(6,8,0,'2025-09-17 03:48:38',1),(7,1,7,'2025-09-06 05:18:30',1),(7,8,0,'2025-09-17 03:48:38',1),(8,1,1,'2025-09-06 06:29:12',1),(8,2,6,'2025-09-06 06:29:12',0),(8,8,0,'2025-09-17 03:48:38',1),(11,1,201,'2025-09-06 14:53:28',1),(11,2,400,'2025-09-06 14:53:28',0),(11,8,0,'2025-09-17 03:48:38',1),(13,1,100,'2025-09-06 16:52:43',1),(13,2,203,'2025-09-06 16:52:43',0),(13,3,500,'2025-09-11 14:07:42',1),(13,8,0,'2025-09-17 03:48:38',1),(14,1,0,'2025-09-16 15:39:40',1),(14,3,0,'2025-09-16 15:39:40',1),(14,6,0,'2025-09-16 15:39:40',0),(14,8,0,'2025-09-17 03:48:38',1);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;

--
-- Table structure for table `inventory_audit`
--

DROP TABLE IF EXISTS `inventory_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_audit` (
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `warehouse_id` int NOT NULL,
  `product_id` int NOT NULL,
  `audit_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `employee_id` int NOT NULL,
  `old_quantity` int NOT NULL,
  `new_quantity` int NOT NULL,
  `change_amount` int NOT NULL,
  `action` varchar(50) NOT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `warehouse_id` (`warehouse_id`),
  KEY `product_id` (`product_id`),
  KEY `auditor_id` (`employee_id`),
  CONSTRAINT `inventory_audit_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  CONSTRAINT `inventory_audit_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `inventory_audit_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_audit`
--

/*!40000 ALTER TABLE `inventory_audit` DISABLE KEYS */;
INSERT INTO `inventory_audit` VALUES (1,1,11,'2025-09-06 16:36:29',1,100,200,100,'update'),(2,2,11,'2025-09-06 16:36:29',1,200,400,200,'update'),(3,1,8,'2025-09-06 16:38:51',1,1,1,0,'update'),(4,2,8,'2025-09-06 16:38:51',1,6,6,0,'update'),(5,1,11,'2025-09-06 16:48:30',1,200,200,0,'update'),(6,2,11,'2025-09-06 16:48:30',1,400,400,0,'update'),(7,1,13,'2025-09-06 16:52:32',1,0,100,100,'import'),(8,2,13,'2025-09-06 16:52:32',1,0,203,203,'import'),(10,1,1,'2025-09-07 02:54:23',1,95,90,-5,'invoice_paid'),(11,2,1,'2025-09-07 14:44:25',1,100,0,-100,'deactivate'),(12,2,3,'2025-09-07 14:44:25',1,97,0,-97,'deactivate'),(13,2,6,'2025-09-07 14:44:25',1,2,0,-2,'deactivate'),(14,2,8,'2025-09-07 14:44:25',1,6,0,-6,'deactivate'),(15,2,11,'2025-09-07 14:44:25',1,400,0,-400,'deactivate'),(16,2,13,'2025-09-07 14:44:25',1,203,0,-203,'deactivate'),(17,1,13,'2025-09-11 14:07:34',1,100,100,0,'update'),(18,2,13,'2025-09-11 14:07:34',1,203,203,0,'update'),(19,3,13,'2025-09-11 14:07:34',1,0,50,50,'update'),(20,3,13,'2025-09-11 14:28:44',1,50,500,450,'update'),(21,1,1,'2025-09-17 03:43:44',1,90,91,1,'IMPORT'),(22,1,7,'2025-09-17 03:43:44',1,6,7,1,'IMPORT'),(23,1,2,'2025-09-17 03:43:44',1,97,98,1,'IMPORT'),(24,1,11,'2025-09-17 03:43:44',1,200,201,1,'IMPORT'),(25,6,14,'2025-09-17 03:55:10',1,0,0,0,'deactivate'),(26,1,13,'2025-09-24 14:58:31',1,100,98,-2,'invoice_paid'),(29,1,13,'2025-09-25 04:10:32',1,98,100,2,'Refund Import (invoice #98)');
/*!40000 ALTER TABLE `inventory_audit` ENABLE KEYS */;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `employee_id` int DEFAULT NULL,
  `promotion_id` int DEFAULT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  `invoice_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL,
  `total_final_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','paid','cancelled','refund_requested','refunded','refund_rejected') NOT NULL DEFAULT 'pending',
  `invoice_address_id` int NOT NULL,
  PRIMARY KEY (`invoice_id`),
  KEY `employee_id` (`employee_id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `customer_id` (`customer_id`),
  KEY `invoice_address_id` (`invoice_address_id`),
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `invoice_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`),
  CONSTRAINT `invoice_ibfk_4` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `invoice_ibfk_5` FOREIGN KEY (`invoice_address_id`) REFERENCES `invoice_address` (`invoice_address_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (64,2,NULL,NULL,0.00,'2025-06-02 14:43:15',300000.00,300000.00,'paid',33),(65,2,NULL,1,100000.00,'2025-09-03 03:34:00',200000.00,100000.00,'cancelled',33),(66,3,NULL,1,100000.00,'2025-09-03 03:34:50',200000.00,100000.00,'paid',34),(67,2,NULL,NULL,0.00,'2025-09-03 04:15:23',150000.00,150000.00,'refunded',33),(68,2,NULL,1,125000.00,'2025-09-03 08:54:43',250000.00,125000.00,'paid',33),(69,2,NULL,NULL,0.00,'2025-09-03 10:04:34',150000.00,150000.00,'refund_requested',33),(70,2,NULL,1,275000.00,'2025-09-03 15:44:46',550000.00,275000.00,'refund_requested',33),(71,2,NULL,NULL,0.00,'2025-09-08 15:19:32',100000.00,100000.00,'cancelled',33),(72,2,NULL,NULL,0.00,'2025-09-15 16:02:34',70000.00,70000.00,'cancelled',33),(80,2,NULL,NULL,0.00,'2025-09-19 10:06:38',200738.00,200000.00,'cancelled',35),(81,2,NULL,NULL,0.00,'2025-09-22 07:56:06',300246.00,300000.00,'cancelled',35),(91,2,NULL,NULL,0.00,'2025-09-22 09:23:35',0.00,0.00,'cancelled',35),(92,2,NULL,NULL,0.00,'2025-09-22 09:23:38',0.00,0.00,'cancelled',35),(93,2,NULL,NULL,0.00,'2025-09-22 09:23:39',0.00,0.00,'cancelled',35),(97,2,NULL,NULL,0.00,'2025-09-22 09:27:51',0.00,0.00,'cancelled',35),(98,2,1,NULL,0.00,'2025-09-24 14:57:46',0.00,0.00,'refunded',35);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;

--
-- Table structure for table `invoice_address`
--

DROP TABLE IF EXISTS `invoice_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_address` (
  `invoice_address_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `customer_id` int NOT NULL,
  `is_delete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`invoice_address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_address`
--

/*!40000 ALTER TABLE `invoice_address` DISABLE KEYS */;
INSERT INTO `invoice_address` VALUES (33,'Phạm','Toàn','toanpham12102003@gmail.com','4','4','Vietnam','1','0799230095',2,0),(34,'Phạm','Toàn','toanpham12102003@gmail.com','1','1','Vietnam','1','0799230095',3,0),(35,'Pham','Tuan','tuanpham@gmail.com','123','123','123','12334','1233333333',2,0);
/*!40000 ALTER TABLE `invoice_address` ENABLE KEYS */;

--
-- Table structure for table `invoice_audit`
--

DROP TABLE IF EXISTS `invoice_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_audit` (
  `audit_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `old_status` enum('pending','paid','cancelled','refund_requested','refunded','refund_rejected') NOT NULL,
  `new_status` enum('pending','paid','cancelled','refund_requested','refunded','refund_rejected') NOT NULL,
  `changed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `changed_by` int NOT NULL,
  `reason` text,
  `changed_by_type` enum('EMPLOYEE','CUSTOMER') DEFAULT 'EMPLOYEE',
  PRIMARY KEY (`audit_id`),
  KEY `fk_invoice_audit` (`invoice_id`),
  KEY `fk_employee_audit` (`changed_by`),
  CONSTRAINT `fk_invoice_audit` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_audit`
--

/*!40000 ALTER TABLE `invoice_audit` DISABLE KEYS */;
INSERT INTO `invoice_audit` VALUES (1,98,'pending','paid','2025-09-24 14:58:31',1,NULL,'EMPLOYEE'),(17,98,'refund_requested','refunded','2025-09-25 04:10:32',1,NULL,'EMPLOYEE'),(19,71,'pending','cancelled','2025-09-25 07:47:14',2,NULL,'CUSTOMER'),(20,69,'paid','refund_requested','2025-09-25 07:47:40',2,NULL,'CUSTOMER');
/*!40000 ALTER TABLE `invoice_audit` ENABLE KEYS */;

--
-- Table structure for table `invoice_detail`
--

DROP TABLE IF EXISTS `invoice_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_detail` (
  `invoice_id` int NOT NULL,
  `product_id` int NOT NULL,
  `promotion_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  `unit_final_amount` decimal(10,2) NOT NULL,
  `is_gift` enum('yes','no') NOT NULL,
  PRIMARY KEY (`invoice_id`,`product_id`),
  KEY `product_id` (`product_id`),
  KEY `promotion_id` (`promotion_id`),
  CONSTRAINT `invoice_detail_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`) ON DELETE CASCADE,
  CONSTRAINT `invoice_detail_ibfk_3` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`),
  CONSTRAINT `invoice_detail_ibfk_4` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_detail`
--

/*!40000 ALTER TABLE `invoice_detail` DISABLE KEYS */;
INSERT INTO `invoice_detail` VALUES (64,1,NULL,3,50000.00,0.00,150000.00,'no'),(64,2,NULL,3,50000.00,0.00,150000.00,'no'),(65,1,NULL,2,50000.00,0.00,100000.00,'no'),(65,2,NULL,2,50000.00,0.00,100000.00,'no'),(66,1,NULL,5,50000.00,0.00,250000.00,'no'),(66,2,NULL,-1,50000.00,0.00,-50000.00,'no'),(67,1,NULL,3,50000.00,0.00,150000.00,'no'),(68,1,NULL,5,50000.00,0.00,250000.00,'no'),(69,1,NULL,1,50000.00,0.00,50000.00,'no'),(69,3,NULL,2,50000.00,0.00,100000.00,'no'),(70,1,NULL,5,50000.00,0.00,250000.00,'no'),(70,2,NULL,3,50000.00,0.00,150000.00,'no'),(70,3,NULL,3,50000.00,0.00,150000.00,'no'),(71,1,NULL,1,50000.00,0.00,50000.00,'no'),(71,3,NULL,1,50000.00,0.00,50000.00,'no'),(72,11,NULL,7,10000.00,0.00,70000.00,'no'),(80,1,NULL,4,50000.00,0.00,200000.00,'no'),(80,13,15,6,123.00,0.00,738.00,'no'),(81,2,NULL,6,50000.00,0.00,300000.00,'no'),(81,13,15,2,123.00,0.00,246.00,'no'),(91,13,15,3,123.00,0.00,369.00,'no'),(92,13,15,3,123.00,0.00,369.00,'no'),(93,13,15,3,123.00,0.00,369.00,'no'),(97,11,15,3,10000.00,1233333.00,30000.00,'no'),(97,13,15,3,123.00,1233333.00,369.00,'no'),(98,13,15,2,123.00,1233333.00,246.00,'no');
/*!40000 ALTER TABLE `invoice_detail` ENABLE KEYS */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` text,
  `price` decimal(10,2) NOT NULL,
  `product_status_id` int NOT NULL,
  `product_category_id` int NOT NULL,
  `supplier_id` varchar(10) NOT NULL,
  `product_type_id` int NOT NULL,
  `product_date_add` timestamp NOT NULL,
  `product_code` varchar(50) NOT NULL,
  `is_delete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`),
  KEY `product_status_id` (`product_status_id`),
  KEY `product_type_id` (`product_category_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `product_type_id_2` (`product_type_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_status_id`) REFERENCES `product_status` (`product_status_id`),
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`),
  CONSTRAINT `product_ibfk_3` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `product_ibfk_4` FOREIGN KEY (`product_type_id`) REFERENCES `product_type` (`product_type_id`),
  CONSTRAINT `product_chk_1` CHECK ((`price` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'testdsd','test',50000.00,1,1,'1',1,'2025-08-24 08:18:09','1',1),(2,'test2','test',50000.00,1,2,'1',1,'2025-08-24 08:18:00','2',0),(3,'text3','textv',50000.00,1,3,'1',1,'2025-09-03 10:00:33','3',0),(6,'1','1',1.00,1,6,'1',1,'2025-09-06 05:09:59','4',0),(7,'5','5',5.00,1,6,'1',1,'2025-09-06 05:18:30','5',0),(8,'1','2',1.00,1,6,'1',2,'2025-09-06 06:29:12','6',0),(11,'1','2',10000.00,1,6,'1',1,'2025-09-06 14:53:28','8',0),(13,'12as','sdfsad',123.00,1,6,'1',2,'2025-09-06 16:52:43','10',0),(14,'san pham moi them','123',213.00,1,5,'12112',1,'2025-09-16 15:39:40','12',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `product_category_id` int NOT NULL,
  `product_category_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_category_id`),
  UNIQUE KEY `type_name` (`product_category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (6,'Bánh bao'),(5,'Bánh mỳ'),(2,'Cà Phê'),(4,'Mỳ'),(3,'Thức ăn đóng hộp'),(1,'Trà');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  `uploaded_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,1,'uploads/images/bakery.png',1,'2025-08-25 15:43:32'),(2,2,'uploads/images/aquafina.jpg',1,'2025-08-25 15:44:12'),(3,1,'uploads/images/aquafina.jpg',0,'2025-08-25 20:30:20'),(4,3,'uploads/images/aquafina.jpg',1,'2025-09-03 17:01:29'),(6,6,'uploads/images/1757135399873-233475814-áº¢nh chá»¥p mÃ n hÃ¬nh 2025-07-23 143559.png',1,'2025-09-06 05:09:59'),(7,7,'uploads/images/1757135910957-926886954-Screenshot (1).png',1,'2025-09-06 05:18:30'),(8,8,'uploads/images/1757140152726-852909992-áº¢nh chá»¥p mÃ n hÃ¬nh 2025-07-23 143559.png',1,'2025-09-06 06:29:12'),(19,11,'uploads/images/1757170408536-943834263-áº¢nh chá»¥p mÃ n hÃ¬nh 2025-07-23 143559.png',1,'2025-09-06 14:53:28'),(20,11,'uploads/images/1757170408540-358339267-Screenshot (1).png',0,'2025-09-06 14:53:28'),(21,11,'uploads/images/1757170408544-33668236-Screenshot (2).png',0,'2025-09-06 14:53:28'),(22,11,'uploads/images/1757170408547-545366269-áº¢nh chá»¥p mÃ n hÃ¬nh 2025-07-23 143559.png',0,'2025-09-06 14:53:28'),(23,11,'uploads/images/1757170408549-38229888-Screenshot (2).png',0,'2025-09-06 14:53:28'),(25,13,'uploads/images/1758807173918-527687879-Screenshot (1).png',1,'2025-09-06 16:52:43'),(26,14,'uploads/images/1758037180401-109132156-áº¢nh chá»¥p mÃ n hÃ¬nh 2025-07-23 143559.png',1,'2025-09-16 15:39:40');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;

--
-- Table structure for table `product_status`
--

DROP TABLE IF EXISTS `product_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_status` (
  `product_status_id` int NOT NULL AUTO_INCREMENT,
  `product_status_name` varchar(255) NOT NULL,
  PRIMARY KEY (`product_status_id`),
  UNIQUE KEY `product_status_name` (`product_status_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_status`
--

/*!40000 ALTER TABLE `product_status` DISABLE KEYS */;
INSERT INTO `product_status` VALUES (1,'còn hạn'),(2,'hết hạn');
/*!40000 ALTER TABLE `product_status` ENABLE KEYS */;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `product_type_id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `product_type_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
INSERT INTO `product_type` VALUES (1,'Đóng gói'),(2,'Tươi'),(3,'Đông lạnh');
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `promotion_id` int NOT NULL AUTO_INCREMENT,
  `promotion_name` varchar(100) NOT NULL,
  `valid_from` date DEFAULT NULL,
  `valid_to` date DEFAULT NULL,
  `distribution_type` enum('share','exclusive') NOT NULL DEFAULT 'share',
  `range_apply` enum('invoice','product') NOT NULL,
  `promotion_status` enum('active','expired','deleted') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`promotion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
INSERT INTO `promotion` VALUES (1,'Giảm giá 50% cho đơn hàng có giá trị từ 200.000 đồng trở lên','2025-08-29','2025-08-31','share','invoice','expired','2025-09-22 03:39:13'),(2,'we','2025-09-09','2025-09-19','exclusive','product','deleted','2025-09-22 03:39:16'),(9,'qư','2025-09-08','2025-09-18','exclusive','product','deleted','2025-09-18 03:24:02'),(13,'qư','2025-09-08','2025-09-18','exclusive','invoice','deleted','2025-09-18 03:24:08'),(14,'qweasdf','2025-09-01','2025-09-26','share','product','active','2025-09-18 03:22:15'),(15,'sdfsdfawef','2025-09-01','2025-10-01','exclusive','product','active','2025-09-18 03:46:15'),(16,'customer discount','2025-09-15','2025-09-30','share','invoice','active','2025-09-22 04:31:29');
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;

--
-- Table structure for table `promotion_category`
--

DROP TABLE IF EXISTS `promotion_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_category` (
  `promotion_id` int NOT NULL,
  `product_category_id` int NOT NULL,
  PRIMARY KEY (`promotion_id`,`product_category_id`),
  KEY `product_category_id` (`product_category_id`),
  CONSTRAINT `promotion_category_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`) ON DELETE CASCADE,
  CONSTRAINT `promotion_category_ibfk_2` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_category`
--

/*!40000 ALTER TABLE `promotion_category` DISABLE KEYS */;
INSERT INTO `promotion_category` VALUES (9,5),(15,6);
/*!40000 ALTER TABLE `promotion_category` ENABLE KEYS */;

--
-- Table structure for table `promotion_effect`
--

DROP TABLE IF EXISTS `promotion_effect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_effect` (
  `effect_id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int DEFAULT NULL,
  `effect_type_id` int NOT NULL,
  `effect_value` varchar(255) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`effect_id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `effect_type_id` (`effect_type_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `promotion_effect_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`),
  CONSTRAINT `promotion_effect_ibfk_4` FOREIGN KEY (`effect_type_id`) REFERENCES `promotion_effect_type` (`effect_type_id`) ON DELETE RESTRICT,
  CONSTRAINT `promotion_effect_ibfk_5` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_effect`
--

/*!40000 ALTER TABLE `promotion_effect` DISABLE KEYS */;
INSERT INTO `promotion_effect` VALUES (1,1,1,'50',NULL),(2,2,3,NULL,14),(9,9,1,'12',NULL),(13,13,1,'12',NULL),(14,14,1,'12',NULL),(15,15,2,'1233333',NULL),(16,16,1,'50',NULL);
/*!40000 ALTER TABLE `promotion_effect` ENABLE KEYS */;

--
-- Table structure for table `promotion_effect_type`
--

DROP TABLE IF EXISTS `promotion_effect_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_effect_type` (
  `effect_type_id` int NOT NULL AUTO_INCREMENT,
  `effect_type_name` varchar(50) NOT NULL,
  `effect_type_description` text NOT NULL,
  PRIMARY KEY (`effect_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_effect_type`
--

/*!40000 ALTER TABLE `promotion_effect_type` DISABLE KEYS */;
INSERT INTO `promotion_effect_type` VALUES (1,'DISCOUNT_PERCENT','Giảm giá theo phần trăm'),(2,'DISCOUNT_AMOUNT','Giảm giá theo số tiền cố định'),(3,'BUY_X_GIFT_Y','Mua X tặng Y');
/*!40000 ALTER TABLE `promotion_effect_type` ENABLE KEYS */;

--
-- Table structure for table `promotion_product`
--

DROP TABLE IF EXISTS `promotion_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_product` (
  `promotion_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`promotion_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `promotion_product_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`) ON DELETE CASCADE,
  CONSTRAINT `promotion_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_product`
--

/*!40000 ALTER TABLE `promotion_product` DISABLE KEYS */;
INSERT INTO `promotion_product` VALUES (14,14);
/*!40000 ALTER TABLE `promotion_product` ENABLE KEYS */;

--
-- Table structure for table `promotion_range_rule_compatibility`
--

DROP TABLE IF EXISTS `promotion_range_rule_compatibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_range_rule_compatibility` (
  `range_apply` enum('invoice','product') NOT NULL,
  `rule_type_id` int NOT NULL,
  PRIMARY KEY (`range_apply`,`rule_type_id`),
  KEY `discount_range_rule_compatibility_ibfk_1` (`rule_type_id`),
  CONSTRAINT `promotion_range_rule_compatibility_ibfk_1` FOREIGN KEY (`rule_type_id`) REFERENCES `promotion_rule_type` (`rule_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_range_rule_compatibility`
--

/*!40000 ALTER TABLE `promotion_range_rule_compatibility` DISABLE KEYS */;
INSERT INTO `promotion_range_rule_compatibility` VALUES ('invoice',1),('product',2),('product',3),('product',4);
/*!40000 ALTER TABLE `promotion_range_rule_compatibility` ENABLE KEYS */;

--
-- Table structure for table `promotion_rule`
--

DROP TABLE IF EXISTS `promotion_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_rule` (
  `rule_id` int NOT NULL AUTO_INCREMENT,
  `promotion_id` int NOT NULL,
  `rule_type_id` int NOT NULL,
  `rule_operator` enum('>=','<=','==','>','<') NOT NULL,
  `rule_value` varchar(255) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `product_category_id` int DEFAULT NULL,
  PRIMARY KEY (`rule_id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `rule_type_id` (`rule_type_id`),
  KEY `product_id` (`product_id`),
  KEY `product_category_id` (`product_category_id`),
  CONSTRAINT `promotion_rule_ibfk_1` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`promotion_id`),
  CONSTRAINT `promotion_rule_ibfk_2` FOREIGN KEY (`rule_type_id`) REFERENCES `promotion_rule_type` (`rule_type_id`) ON DELETE RESTRICT,
  CONSTRAINT `promotion_rule_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `promotion_rule_ibfk_4` FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`product_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_rule`
--

/*!40000 ALTER TABLE `promotion_rule` DISABLE KEYS */;
INSERT INTO `promotion_rule` VALUES (1,1,1,'>=','200000',NULL,NULL),(2,2,3,'<=',NULL,NULL,NULL),(3,2,2,'<=','12',NULL,NULL),(12,9,3,'==',NULL,NULL,5),(16,13,1,'==','12',NULL,NULL),(17,14,4,'==',NULL,14,NULL),(18,15,3,'==',NULL,NULL,6),(19,16,1,'>=','200000',NULL,NULL);
/*!40000 ALTER TABLE `promotion_rule` ENABLE KEYS */;

--
-- Table structure for table `promotion_rule_compatibility`
--

DROP TABLE IF EXISTS `promotion_rule_compatibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_rule_compatibility` (
  `main_rule_type_id` int NOT NULL,
  `compatible_rule_type_id` int NOT NULL,
  PRIMARY KEY (`main_rule_type_id`,`compatible_rule_type_id`),
  KEY `compatible_rule_type_id` (`compatible_rule_type_id`),
  CONSTRAINT `promotion_rule_compatibility_ibfk_1` FOREIGN KEY (`main_rule_type_id`) REFERENCES `promotion_rule_type` (`rule_type_id`),
  CONSTRAINT `promotion_rule_compatibility_ibfk_2` FOREIGN KEY (`compatible_rule_type_id`) REFERENCES `promotion_rule_type` (`rule_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_rule_compatibility`
--

/*!40000 ALTER TABLE `promotion_rule_compatibility` DISABLE KEYS */;
INSERT INTO `promotion_rule_compatibility` VALUES (2,1),(3,1),(4,1),(1,2),(3,2),(4,2),(1,3),(2,3),(1,4),(2,4);
/*!40000 ALTER TABLE `promotion_rule_compatibility` ENABLE KEYS */;

--
-- Table structure for table `promotion_rule_type`
--

DROP TABLE IF EXISTS `promotion_rule_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion_rule_type` (
  `rule_type_id` int NOT NULL AUTO_INCREMENT,
  `rule_type_name` varchar(100) NOT NULL,
  `rule_type_description` text NOT NULL,
  `rule_value_template` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rule_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion_rule_type`
--

/*!40000 ALTER TABLE `promotion_rule_type` DISABLE KEYS */;
INSERT INTO `promotion_rule_type` VALUES (1,'MIN_INVOICE_AMOUNT','Giá trị hóa đơn tối thiểu','Áp dụng cho hóa đơn từ ${rule_value}₫'),(2,'MIN_PRODUCT_QTY','Số lượng sản phẩm tối thiểu','Áp dụng khi mua ít nhất ${value} sản phẩm'),(3,'PRODUCT_CATEGORY','Loại sản phẩm cụ thể','Áp dụng cho danh mục: ${product_category_id}'),(4,'PRODUCT_ID','Sản phẩm cụ thể','Áp dụng cho sản phẩm: ${product_id}');
/*!40000 ALTER TABLE `promotion_rule_type` ENABLE KEYS */;

--
-- Table structure for table `rule_effect_compatibility`
--

DROP TABLE IF EXISTS `rule_effect_compatibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rule_effect_compatibility` (
  `rule_type_id` int NOT NULL,
  `effect_type_id` int NOT NULL,
  PRIMARY KEY (`rule_type_id`,`effect_type_id`),
  KEY `effect_type_id` (`effect_type_id`),
  CONSTRAINT `rule_effect_compatibility_ibfk_1` FOREIGN KEY (`rule_type_id`) REFERENCES `promotion_rule_type` (`rule_type_id`),
  CONSTRAINT `rule_effect_compatibility_ibfk_2` FOREIGN KEY (`effect_type_id`) REFERENCES `promotion_effect_type` (`effect_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rule_effect_compatibility`
--

/*!40000 ALTER TABLE `rule_effect_compatibility` DISABLE KEYS */;
INSERT INTO `rule_effect_compatibility` VALUES (1,1),(2,1),(3,1),(4,1),(1,2),(2,2),(3,2),(4,2),(2,3),(3,3),(4,3);
/*!40000 ALTER TABLE `rule_effect_compatibility` ENABLE KEYS */;

--
-- Table structure for table `session_log`
--

DROP TABLE IF EXISTS `session_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_log` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `login_time` datetime NOT NULL,
  `logout_time` datetime DEFAULT NULL,
  `ip_address` varchar(50) NOT NULL,
  `isValid` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`session_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `session_log_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_log`
--

/*!40000 ALTER TABLE `session_log` DISABLE KEYS */;
INSERT INTO `session_log` VALUES (5,2,'2025-06-25 13:05:35','2025-06-25 13:05:27','::1',1),(6,3,'2025-09-12 06:13:40','2025-09-12 06:13:21','::1',1),(7,4,'2025-09-11 15:31:25','2025-09-11 15:31:36','::1',0),(8,5,'2025-09-09 10:09:27',NULL,'::1',1);
/*!40000 ALTER TABLE `session_log` ENABLE KEYS */;

--
-- Table structure for table `stock_adjustment`
--

DROP TABLE IF EXISTS `stock_adjustment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_adjustment` (
  `adjustment_id` int NOT NULL AUTO_INCREMENT,
  `check_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `adjustment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` text NOT NULL,
  PRIMARY KEY (`adjustment_id`),
  KEY `check_id` (`check_id`),
  KEY `created_by` (`employee_id`),
  CONSTRAINT `stock_adjustment_ibfk_1` FOREIGN KEY (`check_id`) REFERENCES `stock_check` (`check_id`),
  CONSTRAINT `stock_adjustment_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_adjustment`
--

/*!40000 ALTER TABLE `stock_adjustment` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_adjustment` ENABLE KEYS */;

--
-- Table structure for table `stock_adjustment_detail`
--

DROP TABLE IF EXISTS `stock_adjustment_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_adjustment_detail` (
  `adjustment_id` int NOT NULL,
  `product_id` int NOT NULL,
  `adjustment_quantity` int DEFAULT NULL,
  `reason` text,
  PRIMARY KEY (`adjustment_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `stock_adjustment_detail_ibfk_1` FOREIGN KEY (`adjustment_id`) REFERENCES `stock_adjustment` (`adjustment_id`) ON DELETE CASCADE,
  CONSTRAINT `stock_adjustment_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_adjustment_detail`
--

/*!40000 ALTER TABLE `stock_adjustment_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_adjustment_detail` ENABLE KEYS */;

--
-- Table structure for table `stock_check`
--

DROP TABLE IF EXISTS `stock_check`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_check` (
  `check_id` int NOT NULL AUTO_INCREMENT,
  `warehouse_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `check_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` text,
  `status` enum('pending','completed','adjusted') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`check_id`),
  KEY `warehouse_id` (`warehouse_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `stock_check_ibfk_1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`),
  CONSTRAINT `stock_check_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_check`
--

/*!40000 ALTER TABLE `stock_check` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_check` ENABLE KEYS */;

--
-- Table structure for table `stock_check_detail`
--

DROP TABLE IF EXISTS `stock_check_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_check_detail` (
  `check_id` int NOT NULL,
  `product_id` int NOT NULL,
  `actual_quantity` int NOT NULL,
  `system_quantity` int NOT NULL,
  `difference` int NOT NULL,
  PRIMARY KEY (`check_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `stock_check_detail_ibfk_1` FOREIGN KEY (`check_id`) REFERENCES `stock_check` (`check_id`) ON DELETE CASCADE,
  CONSTRAINT `stock_check_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_check_detail`
--

/*!40000 ALTER TABLE `stock_check_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_check_detail` ENABLE KEYS */;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `supplier_id` varchar(10) NOT NULL,
  `supplier_name` varchar(10) NOT NULL,
  `is_deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`supplier_id`),
  UNIQUE KEY `supplier_id` (`supplier_id`),
  UNIQUE KEY `supplier_name` (`supplier_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('1','test',0),('12112','asdd',0);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse` (
  `warehouse_id` int NOT NULL AUTO_INCREMENT,
  `warehouse_name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `employee_id` int NOT NULL,
  `priority` int NOT NULL,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`warehouse_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `warehouse_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` VALUES (1,'test1s','testq',1,1,1),(2,'test2','test2',1,2,0),(3,'test2','12',1,1,1),(4,'123','123',1,123,0),(5,'aqwewqe','qweqweqwe',1,12,0),(6,'123','123',1,12,0),(8,'kho mới','mới',1,1,1);
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;

--
-- Table structure for table `warehouse_export`
--

DROP TABLE IF EXISTS `warehouse_export`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_export` (
  `export_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `export_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `reason` text NOT NULL,
  `invoice_id` int NOT NULL,
  PRIMARY KEY (`export_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `warehouse_export_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_export`
--

/*!40000 ALTER TABLE `warehouse_export` DISABLE KEYS */;
INSERT INTO `warehouse_export` VALUES (3,1,'2025-09-07 02:54:23','Export for invoice 68',68),(4,1,'2025-09-24 14:58:31','Export for invoice 98',98);
/*!40000 ALTER TABLE `warehouse_export` ENABLE KEYS */;

--
-- Table structure for table `warehouse_export_item`
--

DROP TABLE IF EXISTS `warehouse_export_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_export_item` (
  `export_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `warehouse_id` int DEFAULT NULL,
  PRIMARY KEY (`export_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `warehouse_export_item_ibfk_1` FOREIGN KEY (`export_id`) REFERENCES `warehouse_export` (`export_id`) ON DELETE CASCADE,
  CONSTRAINT `warehouse_export_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_export_item`
--

/*!40000 ALTER TABLE `warehouse_export_item` DISABLE KEYS */;
INSERT INTO `warehouse_export_item` VALUES (3,1,5,1),(4,13,2,1);
/*!40000 ALTER TABLE `warehouse_export_item` ENABLE KEYS */;

--
-- Table structure for table `warehouse_receipt`
--

DROP TABLE IF EXISTS `warehouse_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_receipt` (
  `receipt_id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` varchar(10) DEFAULT NULL,
  `employee_id` int NOT NULL,
  `receipt_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `warehouse_id` int NOT NULL,
  `source_type` enum('SUPPLIER','CUSTOMER') NOT NULL DEFAULT 'SUPPLIER',
  `customer_id` int DEFAULT NULL,
  `invoice_id` int DEFAULT NULL,
  PRIMARY KEY (`receipt_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `employee_id` (`employee_id`),
  KEY `warehouse_id` (`warehouse_id`),
  KEY `fk_customer` (`customer_id`),
  KEY `fk_invoice_refund` (`invoice_id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `fk_invoice_refund` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`),
  CONSTRAINT `warehouse_receipt_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`supplier_id`),
  CONSTRAINT `warehouse_receipt_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `warehouse_receipt_ibfk_3` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_receipt`
--

/*!40000 ALTER TABLE `warehouse_receipt` DISABLE KEYS */;
INSERT INTO `warehouse_receipt` VALUES (4,'1',1,'2025-09-06 16:52:32',1,'SUPPLIER',NULL,NULL),(5,'1',1,'2025-09-06 16:52:32',2,'SUPPLIER',NULL,NULL),(17,'1',1,'2025-09-17 03:43:44',1,'SUPPLIER',NULL,NULL),(35,NULL,1,'2025-09-25 04:10:32',1,'CUSTOMER',2,98);
/*!40000 ALTER TABLE `warehouse_receipt` ENABLE KEYS */;

--
-- Table structure for table `warehouse_receipt_item`
--

DROP TABLE IF EXISTS `warehouse_receipt_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_receipt_item` (
  `receipt_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`receipt_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `warehouse_receipt_item_ibfk_1` FOREIGN KEY (`receipt_id`) REFERENCES `warehouse_receipt` (`receipt_id`) ON DELETE CASCADE,
  CONSTRAINT `warehouse_receipt_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse_receipt_item`
--

/*!40000 ALTER TABLE `warehouse_receipt_item` DISABLE KEYS */;
INSERT INTO `warehouse_receipt_item` VALUES (4,13,303,123.00),(5,13,303,123.00),(17,1,1,50000.00),(17,2,1,50000.00),(17,7,1,5.00),(17,11,1,10000.00),(35,13,2,123.00);
/*!40000 ALTER TABLE `warehouse_receipt_item` ENABLE KEYS */;

--
-- Table structure for table `work_schedule`
--

DROP TABLE IF EXISTS `work_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_schedule` (
  `work_schedule_id` int NOT NULL AUTO_INCREMENT,
  `work_day` tinyint NOT NULL,
  `shift_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`work_schedule_id`),
  KEY `employee_id` (`employee_id`),
  KEY `shift_id` (`shift_id`),
  CONSTRAINT `work_schedule_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE,
  CONSTRAINT `work_schedule_ibfk_3` FOREIGN KEY (`shift_id`) REFERENCES `work_shift` (`shift_id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_schedule`
--

/*!40000 ALTER TABLE `work_schedule` DISABLE KEYS */;
INSERT INTO `work_schedule` VALUES (42,5,3,1);
/*!40000 ALTER TABLE `work_schedule` ENABLE KEYS */;

--
-- Table structure for table `work_shift`
--

DROP TABLE IF EXISTS `work_shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_shift` (
  `shift_id` int NOT NULL AUTO_INCREMENT,
  `shift_name` varchar(50) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`shift_id`),
  UNIQUE KEY `shift_name` (`shift_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_shift`
--

/*!40000 ALTER TABLE `work_shift` DISABLE KEYS */;
INSERT INTO `work_shift` VALUES (1,'Sáng','08:00:00','12:00:00'),(2,'Chiều','13:00:00','17:00:00'),(3,'Tối','18:00:00','22:00:00');
/*!40000 ALTER TABLE `work_shift` ENABLE KEYS */;

--
-- Dumping routines for database 'quanlycuahangckk'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-08 14:43:44
