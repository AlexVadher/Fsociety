-- -----------------------------------------------------
-- Schema gestionhoteles
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gestionhoteles` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `gestionhoteles`;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`actividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`actividades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `costo` DOUBLE NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `disponibilidad` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombreRol` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `apellido` VARCHAR(255) NULL DEFAULT NULL,
  `correo` VARCHAR(155) NULL DEFAULT NULL,
  `contraseña` VARCHAR(255) NULL DEFAULT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `genero` VARCHAR(155) NULL DEFAULT NULL,
  `orientacionSexual` VARCHAR(155) NULL DEFAULT NULL,
  `pais` VARCHAR(255) NULL DEFAULT NULL,
  `idRol` INT NULL DEFAULT NULL,
  `guid` VARCHAR(36) NOT NULL,
  `avatarUrl` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idRol` (`idRol` ASC),
  CONSTRAINT `usuarios_ibfk_1`
    FOREIGN KEY (`idRol`)
    REFERENCES `gestionhoteles`.`roles` (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`reservas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL DEFAULT NULL,
  `idUsuario` INT NOT NULL,
  `estado` TINYINT(1) NULL DEFAULT NULL,
  `costoTotal` DOUBLE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idUsuario` (`idUsuario` ASC),
  CONSTRAINT `reservas_ibfk_1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `gestionhoteles`.`usuarios` (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`detallesreservasactividades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`detallesreservasactividades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idReserva` INT NOT NULL,
  `idActividad` INT NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `comprobante` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idReserva` (`idReserva` ASC),
  INDEX `idActividad` (`idActividad` ASC),
  CONSTRAINT `detallesreservasactividades_ibfk_1`
    FOREIGN KEY (`idReserva`)
    REFERENCES `gestionhoteles`.`reservas` (`id`),
  CONSTRAINT `detallesreservasactividades_ibfk_2`
    FOREIGN KEY (`idActividad`)
    REFERENCES `gestionhoteles`.`actividades` (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`hoteles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`hoteles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(155) NULL DEFAULT NULL,
  `estrellas` INT NULL DEFAULT NULL,
  `disponibilidad` TINYINT(1) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`habitaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`habitaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(255) NULL DEFAULT NULL,
  `tipo` VARCHAR(255) NULL DEFAULT NULL,
  `costo` DOUBLE NULL DEFAULT NULL,
  `idHotel` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idHotel` (`idHotel` ASC),
  CONSTRAINT `habitaciones_ibfk_1`
    FOREIGN KEY (`idHotel`)
    REFERENCES `gestionhoteles`.`hoteles` (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`detallesreservashabitaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`detallesreservashabitaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idReserva` INT NOT NULL,
  `idHabitacion` INT NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `comprobante` VARCHAR(255) NULL DEFAULT NULL,
  `peticiones` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idReserva` (`idReserva` ASC),
  INDEX `idHabitacion` (`idHabitacion` ASC),
  CONSTRAINT `detallesreservashabitaciones_ibfk_1`
    FOREIGN KEY (`idReserva`)
    REFERENCES `gestionhoteles`.`reservas` (`id`),
  CONSTRAINT `detallesreservashabitaciones_ibfk_2`
    FOREIGN KEY (`idHabitacion`)
    REFERENCES `gestionhoteles`.`habitaciones` (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`tiposdeservicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`tiposdeservicios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`serviciosadicionales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`serviciosadicionales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `costo` DOUBLE NULL DEFAULT NULL,
  `idtipodeservicio` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idtipodeservicio` (`idtipodeservicio` ASC),
  CONSTRAINT `serviciosadicionales_ibfk_1`
    FOREIGN KEY (`idtipodeservicio`)
    REFERENCES `gestionhoteles`.`tiposdeservicios` (`id`)
) ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `gestionhoteles`.`detallesreservasserviciosadicionales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gestionhoteles`.`detallesreservasserviciosadicionales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idReserva` INT NOT NULL,
  `idServicioAdicional` INT NOT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `comprobante` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idReserva` (`idReserva` ASC),
  INDEX `idServicioAdicional` (`idServicioAdicional` ASC),
  CONSTRAINT `detallesreservasserviciosadicionales_ibfk_1`
    FOREIGN KEY (`idReserva`)
    REFERENCES `gestionhoteles`.`reservas` (`id`),
  CONSTRAINT `detallesreservasserviciosadicionales_ibfk_2`
    FOREIGN KEY (`idServicioAdicional`)
    REFERENCES `gestionhoteles`.`serviciosadicionales` (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai
