-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for vox_app
CREATE DATABASE IF NOT EXISTS `vox_app` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `vox_app`;

-- Dumping structure for table vox_app.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` int(11) DEFAULT '0',
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `mobile_no` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table vox_app.users: ~2 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `role`, `first_name`, `last_name`, `gender`, `birth_date`, `email`, `password`, `country`, `mobile_no`, `status`, `created_date`, `updated_date`) VALUES
	(1, 0, 'Amit', 'Rathod', 'Male', '1997-06-03', 'er.avinashrathod@gmail.com', '$2a$10$iwotid8T6zkIrcNv/L4/.ugQL7Qqt6P5HmLHhyqjEg2zGC18i2YsC', 'IND', NULL, 1, '2022-06-21 23:22:22', '2022-06-21 23:22:22'),
	(2, 0, 'Avinash', 'Rathod', 'Male', '1997-06-03', 'er.avinashrathod+1@gmail.com', '$2a$10$EzGS0UkJLA5Qj1FRxKPMzeoFNtnPPt.GJagzBQlmix.eLlrEVA9y2', 'IND', '9924283974', 1, '2022-06-21 23:23:50', '2022-06-21 23:23:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table vox_app.users_blocks
CREATE TABLE IF NOT EXISTS `users_blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `block_user_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table vox_app.users_blocks: ~1 rows (approximately)
DELETE FROM `users_blocks`;
/*!40000 ALTER TABLE `users_blocks` DISABLE KEYS */;
INSERT INTO `users_blocks` (`id`, `user_id`, `block_user_id`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, '2022-06-22 10:39:18', '2022-06-22 10:39:18');
/*!40000 ALTER TABLE `users_blocks` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
