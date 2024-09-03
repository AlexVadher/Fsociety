INSERT INTO roles (nombreRol) VALUES ('Administrador');
INSERT INTO roles (nombreRol) VALUES ('Recepcionista');
INSERT INTO roles (nombreRol) VALUES ('Cliente');


INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol) 
VALUES ('Juan', 'Pérez', 'juan.perez@example.com', 'contraseña123', '555-1234', 'Masculino', 'Heterosexual', 'Colombia', 3);

INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol) 
VALUES ('Ana', 'García', 'ana.garcia@example.com', 'contraseña456', '555-5678', 'Femenino', 'Heterosexual', 'México', 3);

INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol) 
VALUES ('Carlos', 'Ramírez', 'carlos.ramirez@example.com', 'admin789', '555-9012', 'Masculino', 'Heterosexual', 'Argentina', 1);


INSERT INTO actividades (nombre, costo, descripcion, disponibilidad) 
VALUES ('Excursión a la montaña', 100.0, 'Excursión guiada a la montaña con almuerzo incluido', TRUE);

INSERT INTO actividades (nombre, costo, descripcion, disponibilidad) 
VALUES ('Tour en bicicleta', 50.0, 'Tour guiado en bicicleta por la ciudad', TRUE);

INSERT INTO actividades (nombre, costo, descripcion, disponibilidad) 
VALUES ('Clases de cocina local', 75.0, 'Clase de cocina local con chef experimentado', FALSE);


INSERT INTO hoteles (nombre, telefono, ubicacion, estrellas, disponibilidad, descripcion) 
VALUES ('Hotel Grand', '555-1111', 'Ciudad A', 5, TRUE, 'Hotel de lujo con todas las comodidades');

INSERT INTO hoteles (nombre, telefono, ubicacion, estrellas, disponibilidad, descripcion) 
VALUES ('Hostal Vista', '555-2222', 'Ciudad B', 3, TRUE, 'Hostal económico con buena ubicación');

INSERT INTO hoteles (nombre, telefono, ubicacion, estrellas, disponibilidad, descripcion) 
VALUES ('Resort Playa', '555-3333', 'Playa C', 4, FALSE, 'Resort frente a la playa con spa');


INSERT INTO habitaciones (codigo, tipo, costo, idHotel) 
VALUES ('A101', 'Individual', 80.0, 1);

INSERT INTO habitaciones (codigo, tipo, costo, idHotel) 
VALUES ('B202', 'Doble', 120.0, 1);

INSERT INTO habitaciones (codigo, tipo, costo, idHotel) 
VALUES ('C303', 'Suite', 200.0, 2);

INSERT INTO imagenesActividades (urlImg, idActividad) 
VALUES ('https://example.com/images/montaña.jpg', 1);

INSERT INTO imagenesActividades (urlImg, idActividad) 
VALUES ('https://example.com/images/bicicleta.jpg', 2);


INSERT INTO imagenesHoteles (urlImg, idHotel) 
VALUES ('https://example.com/images/hotel_grand.jpg', 1);

INSERT INTO imagenesHoteles (urlImg, idHotel) 
VALUES ('https://example.com/images/hostal_vista.jpg', 2);


INSERT INTO favoritosHoteles (idUsuario, idHotel) 
VALUES (1, 1);

INSERT INTO favoritosHoteles (idUsuario, idHotel) 
VALUES (2, 2);


INSERT INTO favoritosActividades (idUsuario, idActividad) 
VALUES (1, 1);

INSERT INTO favoritosActividades (idUsuario, idActividad) 
VALUES (2, 2);


INSERT INTO reservas (fecha, idUsuario, estado, costoTotal) 
VALUES ('2024-09-15', 1, TRUE, 320.0);

INSERT INTO reservas (fecha, idUsuario, estado, costoTotal) 
VALUES ('2024-09-20', 2, FALSE, 150.0);


INSERT INTO tiposdeservicios (nombre) VALUES ('Spa');
INSERT INTO tiposdeservicios (nombre) VALUES ('Transporte');


INSERT INTO serviciosAdicionales (nombre, descripcion, costo, idtipodeservicio) 
VALUES ('Masaje en el spa', 'Masaje relajante de 60 minutos', 60.0, 1);

INSERT INTO serviciosAdicionales (nombre, descripcion, costo, idtipodeservicio) 
VALUES ('Transporte al aeropuerto', 'Servicio de transporte privado al aeropuerto', 30.0, 2);


INSERT INTO detallesReservasServiciosAdicionales (idReserva, idServicioAdicional, descripcion, comprobante) 
VALUES (1, 1, 'Masaje realizado en el spa', 'comprobante_masaje.pdf');

INSERT INTO detallesReservasServiciosAdicionales (idReserva, idServicioAdicional, descripcion, comprobante) 
VALUES (2, 2, 'Transporte al aeropuerto reservado', 'comprobante_transporte.pdf');


INSERT INTO detallesReservasActividades (idReserva, idActividad, descripcion, comprobante) 
VALUES (1, 1, 'Excursión a la montaña confirmada', 'comprobante_excursion.pdf');

INSERT INTO detallesReservasActividades (idReserva, idActividad, descripcion, comprobante) 
VALUES (2, 2, 'Tour en bicicleta reservado', 'comprobante_tour.pdf');



INSERT INTO detallesReservasActividades (idReserva, idActividad, descripcion, comprobante) 
VALUES (1, 1, 'Excursión a la montaña confirmada', 'comprobante_excursion.pdf');

INSERT INTO detallesReservasActividades (idReserva, idActividad, descripcion, comprobante) 
VALUES (2, 2, 'Tour en bicicleta reservado', 'comprobante_tour.pdf');


INSERT INTO detallesReservasHabitaciones (idReserva, idHabitacion, descripcion, comprobante, peticiones) 
VALUES (1, 1, 'Habitación individual reservada', 'comprobante_habitacion.pdf', 'No fumadores');

INSERT INTO detallesReservasHabitaciones (idReserva, idHabitacion, descripcion, comprobante, peticiones) 
VALUES (2, 3, 'Suite reservada para dos noches', 'comprobante_suite.pdf', 'Cama extra');


