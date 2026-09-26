-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               12.3.2-MariaDB - MariaDB Server
-- Server OS:                    Win64
-- HeidiSQL Version:             12.17.0.7270
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping data for table campus_complaints.admins: ~2 rows (approximately)
INSERT INTO `admins` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
	(1, 'Jaywant', 'jaywant@campuscare.com', 'admin_2408054', '2026-09-26 17:21:48', '2026-09-26 17:21:48'),
	(2, 'Sakshi', 'sakshi@campuscare.com', 'sakshi_0224', '2026-09-26 17:21:48', '2026-09-26 17:21:48');

-- Dumping data for table campus_complaints.categories: ~8 rows (approximately)
INSERT INTO `categories` (`id`, `name`) VALUES
	(1, 'Classroom'),
	(2, 'Computer Lab'),
	(3, 'Washroom'),
	(4, 'Corridor'),
	(5, 'Staffroom'),
	(6, 'Office'),
	(7, 'Library'),
	(8, 'Hall');

-- Dumping data for table campus_complaints.complaints: ~2 rows (approximately)
INSERT INTO `complaints` (`id`, `user_id`, `category_id`, `title`, `description`, `priority`, `status`) VALUES
	(1, 4, 2, 'Computers not working', 'XENON18 Computer from lab 3 is not working and its lagging to much software\'s take to much time to get open which can make problem during the practical exams.', 'High', 'Pending'),
	(2, 4, 1, 'Projector is not working properly', 'Projector from class S206 second floor is not working properly it is blur, cant see properly dull and speaker also not working.', 'Medium', 'Resolved');

-- Dumping data for table campus_complaints.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`) VALUES
	(1, 'Amar Naik ', 'an648946@gmail.com', '7410535828', '123456789', 'student'),
	(4, 'Damodar Shirodkar', 'damu@gmail.com', '9923683735', '123456789', 'student'),
	(6, 'Laxaman Bhat', 'bhat123@gmail.com', '7832945610', '987654321', 'student');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
