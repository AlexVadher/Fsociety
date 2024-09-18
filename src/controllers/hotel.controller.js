import hotelModel from '../models/hotel.model.js'; // Importar el modelo de hoteles

export class hotelController {
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
    static async listHotels(req, res) {
        try {
            const hotels = await hotelModel.getAllHotels();
            res.render('hotels/hotel', {hotels}); // Enviar los hoteles a la vista

            const currentPath = req.path;

            const menuItems = [
                {
                    name: 'Hoteles',
                    link: `/admin/hotels/`,
                    icon: 'fas fa-user-edit',
                    active: currentPath.includes('/admin/hotels/'),
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
