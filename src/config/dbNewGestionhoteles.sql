-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.38 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para gestionhoteles
CREATE DATABASE IF NOT EXISTS `gestionhoteles` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestionhoteles`;

-- Volcando estructura para tabla gestionhoteles.actividades
CREATE TABLE IF NOT EXISTS `actividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `costo` double DEFAULT NULL,
  `descripcion` json DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.detallesreservasactividades
CREATE TABLE IF NOT EXISTS `detallesreservasactividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idReserva` int NOT NULL,
  `idActividad` int NOT NULL,
  `descripcion` json DEFAULT NULL,
  `comprobante` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idReserva` (`idReserva`),
  KEY `idActividad` (`idActividad`),
  CONSTRAINT `detallesreservasactividades_ibfk_1` FOREIGN KEY (`idReserva`) REFERENCES `reservas` (`id`),
  CONSTRAINT `detallesreservasactividades_ibfk_2` FOREIGN KEY (`idActividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.detallesreservashabitaciones
CREATE TABLE IF NOT EXISTS `detallesreservashabitaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idReserva` int NOT NULL,
  `idHabitacion` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `comprobante` varchar(255) DEFAULT NULL,
  `peticiones` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idReserva` (`idReserva`),
  KEY `idHabitacion` (`idHabitacion`),
  CONSTRAINT `detallesreservashabitaciones_ibfk_1` FOREIGN KEY (`idReserva`) REFERENCES `reservas` (`id`),
  CONSTRAINT `detallesreservashabitaciones_ibfk_2` FOREIGN KEY (`idHabitacion`) REFERENCES `habitaciones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.detallesreservasserviciosadicionales
CREATE TABLE IF NOT EXISTS `detallesreservasserviciosadicionales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idReserva` int NOT NULL,
  `idServicioAdicional` int NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `comprobante` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idReserva` (`idReserva`),
  KEY `idServicioAdicional` (`idServicioAdicional`),
  CONSTRAINT `detallesreservasserviciosadicionales_ibfk_1` FOREIGN KEY (`idReserva`) REFERENCES `reservas` (`id`),
  CONSTRAINT `detallesreservasserviciosadicionales_ibfk_2` FOREIGN KEY (`idServicioAdicional`) REFERENCES `serviciosadicionales` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.favoritosactividades
CREATE TABLE IF NOT EXISTS `favoritosactividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idActividad` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idActividad` (`idActividad`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `favoritosactividades_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `favoritosactividades_ibfk_2` FOREIGN KEY (`idActividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.favoritoshoteles
CREATE TABLE IF NOT EXISTS `favoritoshoteles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idHotel` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idHotel` (`idHotel`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `favoritoshoteles_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `favoritoshoteles_ibfk_2` FOREIGN KEY (`idHotel`) REFERENCES `hoteles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.habitaciones
CREATE TABLE IF NOT EXISTS `habitaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `costo` double DEFAULT NULL,
  `idHotel` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idHotel` (`idHotel`),
  CONSTRAINT `habitaciones_ibfk_1` FOREIGN KEY (`idHotel`) REFERENCES `hoteles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.hoteles
CREATE TABLE IF NOT EXISTS `hoteles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `ubicacion` varchar(155) DEFAULT NULL,
  `estrellas` int DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.imagenesactividades
CREATE TABLE IF NOT EXISTS `imagenesactividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `urlImg` varchar(255) DEFAULT NULL,
  `idActividad` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idActividad` (`idActividad`),
  CONSTRAINT `imagenesactividades_ibfk_1` FOREIGN KEY (`idActividad`) REFERENCES `actividades` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.imageneshoteles
CREATE TABLE IF NOT EXISTS `imageneshoteles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `urlImg` varchar(255) DEFAULT NULL,
  `idHotel` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idHotel` (`idHotel`),
  CONSTRAINT `imageneshoteles_ibfk_1` FOREIGN KEY (`idHotel`) REFERENCES `hoteles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `idUsuario` int NOT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `costoTotal` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreRol` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.serviciosadicionales
CREATE TABLE IF NOT EXISTS `serviciosadicionales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `costo` double DEFAULT NULL,
  `idtipodeservicio` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idtipodeservicio` (`idtipodeservicio`),
  CONSTRAINT `serviciosadicionales_ibfk_1` FOREIGN KEY (`idtipodeservicio`) REFERENCES `tiposdeservicios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.tiposdeservicios
CREATE TABLE IF NOT EXISTS `tiposdeservicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla gestionhoteles.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(155) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `genero` varchar(155) DEFAULT NULL,
  `orientacionSexual` varchar(155) DEFAULT NULL,
  `pais` varchar(255) DEFAULT NULL,
  `idRol` int DEFAULT NULL,
  `guid` varchar(36) NOT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idRol` (`idRol`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
