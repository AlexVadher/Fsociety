import hotelModel from '../models/hotel.model.js'; // Importar el modelo de hoteles

export class hotelController {
    // Método para registrar un hotel (POST)
    static async registerHotel(req, res) {
        try {
            // Obtener los datos del formulario de registro desde req.body y validarlos
            const {
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad,
                descripcion,
            } = req.body;

            console.log('Datos recibidos:', req.body);

            const disponibilidadBoolean = disponibilidad === '1';

            // Llamar al método createUser de la clase UserModel
            const result = await hotelModel.createHotel({
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad: disponibilidadBoolean,
                descripcion,
            });

            console.log('Resultado de la creación del hotel:', result); // Registro de resultado

            res.redirect('/admin/hotels');
        } catch (err) {
            console.error('Error al registrar el hotel:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }
    // Método para subir varias imágenes a un hotel (POST)
    static async uploadImages(req, res) {
        try {
            // Obtener el id del hotel desde req.params
            const {id} = req.params;

            // Validar si se han subido archivos de imagen en la solicitud
            if (!req.files || req.files.length === 0) {
                return res
                    .status(400)
                    .json({message: 'No se han subido archivos'});
            }

            // Obtener las URLs de las imágenes subidas
            const imgs = req.files.map(
                (file) => `/uploads/hotels/${id}/${file.filename}`,
            );

            // Registro de la información de las imágenes subidas
            console.log('Datos recibidos:', req.files);

            // Llamar al método uploadImages de la clase HotelModel
            const result = await hotelModel.uploadImages({id, imgs});

            console.log('Resultado de la subida de las imágenes:', result);

            // Redirigir a la página de hoteles con el mensaje de éxito
            /* res.status(200).json({
                message: 'Imágenes subidas exitosamente',
                body: result,
            }); */

            res.redirect('/admin/hotels');
        } catch (err) {
            console.error('Error al subir las imágenes:', err);
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }
    static async updateHotel(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                return res
                    .status(400)
                    .json({message: 'ID del hotel no proporcionado'});
            }

            const {
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad,
                descripcion,
            } = req.body;

            // Validar que todos los campos requeridos estén presentes
            if (
                !nombre ||
                !telefono ||
                !ubicacion ||
                estrellas === undefined ||
                disponibilidad === undefined ||
                !descripcion
            ) {
                return res
                    .status(400)
                    .json({message: 'Todos los campos son obligatorios'});
            }

            // Verificar que estrellas sea un número válido
            if (isNaN(estrellas) || estrellas < 1 || estrellas > 5) {
                return res.status(400).json({
                    message: 'Las estrellas deben ser un número entre 1 y 5',
                });
            }

            // Verificar que disponibilidad sea un valor booleano
            const isDisponibilidadValid =
                disponibilidad === '1' || disponibilidad === '0';
            if (!isDisponibilidadValid) {
                return res.status(400).json({
                    message: 'La disponibilidad debe ser un valor booleano',
                });
            }

            // Convertir disponibilidad a booleano
            const disponibilidadBoolean = disponibilidad === '1';

            // Crear objeto con los datos actualizados
            const hotelData = {
                nombre,
                telefono,
                ubicacion,
                estrellas: parseInt(estrellas, 10), // Convertir a número entero base 10 (decimal) para evitar errores
                disponibilidad: disponibilidadBoolean,
                descripcion,
            };

            // Llamar al método updateHotel de la clase HotelModel
            const result = await hotelModel.updateHotel(id, hotelData);

            // Responder con éxito
            res.redirect('/admin/hotels');
        } catch (err) {
            // Manejo de errores
            console.error('Error al actualizar el hotel:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
        }
    }

    // Método para Listar los hoteles (GET)
    static async listHotels(req, res) {
        try {
            const hotels = await hotelModel.getAllHotels();

            const currentPath = req.path;

            const menuItems = [
                {
                    name: 'Usuarios',
                    link: `/admin/usuarios`,
                    icon: 'fas fa-users',
                    active: currentPath.includes('/admin/usuarios'),
                },
                {
                    name: 'Hoteles',
                    link: `/admin/hotels`,
                    icon: 'fas fa-hotel',
                    active: currentPath.includes('/admin/hotels'),
                },
                {
                    name: 'Hoteles',
                    link: `/admin/ListActivities`,
                    icon: 'fas fa-calendar-alt',
                    active: currentPath.includes('/admin/ListActivities'),
                },
                {
                    name: 'Reservas',
                    link: `/admin/reservas`,
                    icon: 'fas fa-book',
                    active: currentPath.includes('/admin/reservas'),
                },
                {
                    name: 'Dashboard',
                    link: `/admin/estadisticas`,
                    icon: 'fas fa-chart-bar',
                    active: currentPath.includes('/admin/Dashboard'),
                },
                {
                    name: 'Configuración',
                    link: `/admin/configuracion`,
                    icon: 'fas fa-cogs',
                    active: currentPath.includes('/admin/configuracion'),
                },
                // Puedes añadir más elementos según sea necesario
            ];

            // Activar dinámicamente el enlace actual
            menuItems.forEach((item) => {
                if (item.link === currentPath) {
                    item.active = true;
                }
            });

            res.render('hotels/hotel', {
                hotels,
                layout: 'main',
                title: 'Hoteles',
                currentPath,
                menuItems: menuItems,
            });
        } catch (err) {
            console.error('Error al listar los hoteles:', err);
            res.status(500).json({
                message: 'Error al obtener la lista de hoteles',
            });
        }
    }
    static async listHotelImages(req, res) {
        try {
            // Llamar al método getAllImages de la clase HotelModel para obtener las imágenes
            const images = await hotelModel.getAllImages();

            // Verificar si se encontraron imágenes
            if (!images || images.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron imágenes',
                });
            }

            console.log('Imágenes encontradas:', images); // Registro de las imágenes encontradas

            // Organizar las imágenes por Hotel
            const imagesByHotel = images.reduce((acc, item) => {
                const {
                    id,
                    nombre,
                    telefono,
                    ubicacion,
                    estrellas,
                    descripcion,
                    disponibilidad,
                    urlImg,
                } = item;

                if (!acc[id]) {
                    acc[id] = {
                        id,
                        nombre,
                        telefono,
                        ubicacion,
                        estrellas,
                        descripcion,
                        disponibilidad,
                        imagen: urlImg, // Asignar la primera imagen
                    };
                }

                return acc;
            }, {});

            // Convertir el objeto en un array
            const hotels = Object.values(imagesByHotel);

            // Renderizar la vista de Hoteles con imágenes
            res.render('hotels/homeHotel', {
                hotels,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer los Hoteles:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    static async deleteHotel(req, res) {
        try {
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID del Hotel es obligatorio',
                });
            }

            // 1. Eliminar las imágenes relacionadas al hotel
            const images = await hotelModel.getImagesByHotelId(id);
            if (images && images.length > 0) {
                await hotelModel.deleteImagesByHotelId(id);
            }

            // 3. Eliminar el hotel de la base de datos
            const result = await hotelModel.deleteHotel(id);

            // Verificar si el hotel fue eliminado
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Hotel no encontrado o no eliminado',
                });
            }

            res.status(200).json({
                success: true,
                message:
                    'Hotel, habitaciones y sus imágenes eliminados exitosamente',
            });
        } catch (err) {
            console.error('Error al eliminar la Hotel:', err);
            res.status(500).json({
                success: false,
                message: 'Error 500: ' + err.message,
            });
        }
    }
    static async listHotelById(req, res) {
        try {
            // Obtener el ID de la hotel de los parámetros de la URL
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID del hotel es obligatorio',
                });
            }

            // Llamar al método getHotelById de la clase hotelModel
            const hotel = await hotelModel.getHotelById(id);

            // Verificar si se encontró la Hotel
            if (!hotel) {
                return res.status(404).json({
                    message: 'Hotel no encontrado',
                });
            }

            // Llamar al método getImagesByhotelId de la clase HotelModel para obtener las imágenes
            const images = await hotelModel.getImagesByHotelId(id);

            // Responder con el hotel y sus imágenes
            res.render('hotels/detailHotel', {
                hotel,
                images,
            });

            console.log('Hotel y sus imágenes:', {hotel, images});
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer la hotel:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }

    static async reserveHotel(req, res) {
        try {
            // Obtener el ID de la Hotel de los parámetros de la URL
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID del Hotel es obligatorio',
                });
            }

            // Llamar al método gethotelById de la clase hotelModel
            const hotel = await hotelModel.getHotelById(id);

            // Verificar si se encontró la Hotel
            if (!hotel) {
                return res.status(404).json({
                    message: 'Hotel no encontrada',
                });
            }

            // Responder con la Hotel
            res.render('hotels/reservehotel', {
                hotel,
            });

            console.log('Hotel no encontrado:', hotel);
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer la Hotel:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
}

export default hotelController;
