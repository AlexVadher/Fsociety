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

            res.redirect('/');
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
    // Método para eliminar un hotel (DELETE)
    static async updateHotel(req, res) {
        try {
            // Obtener el id del usuario desde req.params
            const {id} = req.params;

            // Obtener los datos del formulario de actualización desde req.body
            const {
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad,
                descripcion,
            } = req.body;

            // Llamar al método updateUser de la clase UserModel
            const result = await hotelModel.updateHotel({
                id,
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad,
                descripcion,
            });

            console.log('Resultado de la actualización del hotel:', result); // Registro de resultado

            res.status(200).json({
                message: 'hotel actualizado exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al actualizar el hotel:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
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
                    name: 'Actividades',
                    link: `/admin/actividades`,
                    icon: 'fas fa-calendar-alt',
                    active: currentPath.includes('/admin/actividades'),
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
}

export default hotelController;
