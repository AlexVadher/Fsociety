CREATE DATABASE gestionHoteles;

USE gestionHoteles;

-- Crear tabla 'tiposdeservicios'
CREATE TABLE tiposdeservicios (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Crear tabla 'roles'
CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombreRol VARCHAR(250)
);

-- Crear tabla 'usuarios'
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    correo VARCHAR(155),
    contraseña VARCHAR(255),
    telefono VARCHAR(20),
    genero VARCHAR(155),
    orientacionSexual VARCHAR(155),
    pais VARCHAR(255),
    idRol INT,
    FOREIGN KEY (idRol) REFERENCES roles(id)
);

-- Crear tabla 'actividades'
CREATE TABLE actividades (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    costo DOUBLE,
    descripcion VARCHAR(255),
    disponibilidad BOOLEAN
);

-- Crear tabla 'hoteles'
CREATE TABLE hoteles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    telefono VARCHAR(20),
    ubicacion VARCHAR(155),
    estrellas INT,
    disponibilidad BOOLEAN,
    descripcion VARCHAR(255)
);

-- Crear tabla 'habitaciones'
CREATE TABLE habitaciones (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    codigo VARCHAR(255),
    tipo VARCHAR(255),
    costo DOUBLE,
    idHotel INT NOT NULL,
    FOREIGN KEY (idHotel) REFERENCES hoteles(id)
);

-- Crear tabla 'imagenesActividades'
CREATE TABLE imagenesActividades (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    urlImg VARCHAR(255),
    idActividad INT,
    FOREIGN KEY (idActividad) REFERENCES actividades(id)
);

-- Crear tabla 'imagenesHoteles'
CREATE TABLE imagenesHoteles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    urlImg VARCHAR(255),
    idHotel INT,
    FOREIGN KEY (idHotel) REFERENCES hoteles(id)
);

-- Crear tabla 'favoritos_hoteles'
CREATE TABLE favoritosHoteles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idUsuario INT NOT NULL,
    idHotel INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idHotel) REFERENCES hoteles(id),
    UNIQUE (idUsuario, idHotel)
);

-- Crear tabla 'favoritos_actividades'
CREATE TABLE favoritosActividades (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idUsuario INT NOT NULL,
    idActividad INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idActividad) REFERENCES actividades(id),
    UNIQUE (idUsuario, idActividad)
);

-- Crear tabla 'reservas'
CREATE TABLE reservas (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    fecha DATE,
    idUsuario INT NOT NULL,
    estado BOOLEAN,
    costoTotal DOUBLE,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

-- Crear tabla 'serviciosAdicionales'
CREATE TABLE serviciosAdicionales (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    costo DOUBLE,
    idtipodeservicio INT NOT NULL,
    FOREIGN KEY (idtipodeservicio) REFERENCES tiposdeservicios(id)
);

-- Crear tabla 'detallesReservasServiciosAdicionales'
CREATE TABLE detallesReservasServiciosAdicionales (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idReserva INT NOT NULL,
    idServicioAdicional INT NOT NULL,
    descripcion VARCHAR(255),
    comprobante VARCHAR(255),
    FOREIGN KEY (idReserva) REFERENCES reservas(id),
    FOREIGN KEY (idServicioAdicional) REFERENCES serviciosAdicionales(id)
);

-- Crear tabla 'detallesReservasActividades'
CREATE TABLE detallesReservasActividades (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idReserva INT NOT NULL,
    idActividad INT NOT NULL,
    descripcion VARCHAR(255),
    comprobante VARCHAR(255),
    FOREIGN KEY (idReserva) REFERENCES reservas(id),
    FOREIGN KEY (idActividad) REFERENCES actividades(id)
);

-- Crear tabla 'detallesReservasHabitaciones'
CREATE TABLE detallesReservasHabitaciones (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    idReserva INT NOT NULL,
    idHabitacion INT NOT NULL,
    descripcion VARCHAR(255),
    comprobante VARCHAR(255),
    peticiones VARCHAR(255),
    FOREIGN KEY (idReserva) REFERENCES reservas(id),
    FOREIGN KEY (idHabitacion) REFERENCES habitaciones(id)
);
