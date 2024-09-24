import habitacionModel from '../models/habitacion.model.js';
import hotelModel from '../models/hotel.model.js';

export class habitacionController {
    static async registerHabitacion(req, res) {
        try {
            const {codigo, tipo, costo, idhotel} = req.body;

            // Validación básica
            if (!codigo || !tipo || !costo || !idhotel) {
                return res
                    .status(400)
                    .json({message: 'Todos los campos son requeridos'});
            }

            const result = await habitacionModel.createHabitacion({
                codigo,
                tipo,
                costo,
                idhotel,
            });
            console.log('Resultado de la creación de la habitación:', result);

            res.redirect('/partials/habitacionModal'); // Redirigir a la vista de habitaciones
        } catch (err) {
            console.error('Error al registrar la habitación:', err);
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }

    static async mostrarFormulario(req, res) {
        try {
            const hoteles = await hotelModel.getAllHotels(); // Suponiendo que tienes este método en tu modelo de hoteles
            res.render('partials/registerHabitacion', {hoteles}); // Enviamos los hoteles a la vista
        } catch (err) {
            console.error('Error al obtener los hoteles:', err);
            res.status(500).json({message: 'Error al cargar los hoteles'});
        }
    }

    static async updateHabitacion(req, res) {
        try {
            const {id} = req.params; // Obtener el id de la habitación desde req.params
            const {codigo, tipo, costo, idhotel} = req.body; // Datos del formulario

            // Llamar al método updateHabitacion del modelo
            const result = await habitacionModel.updateHabitacion(
                id, // Pasar el id de la habitación
                {codigo, tipo, costo, idhotel}, // Pasar los datos de la habitación
            );

            console.log(
                'Resultado de la actualización de la habitación:',
                result,
            );

            res.status(200).json({
                message: 'Habitación actualizada exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al actualizar la habitación:', err);
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }

    static async listHabitacion(req, res) {
        try {
            const habitaciones = await habitacionModel.getAllHabitaciones(); // Obtener las habitaciones
            res.render('partials/habitacionModal', {habitaciones}); // Enviar las habitaciones a la vista
        } catch (err) {
            console.error('Error al listar las habitaciones:', err);
            res.status(500).json({
                message: 'Error al obtener la lista de habitaciones',
            });
        }
    }

    static async getHabitacionesByHotel(req, res) {
        const {hotelId} = req.params;
        try {
            const habitaciones = await habitacionModel.getHabitacionesByHotel(
                hotelId,
            );
            res.status(200).json({habitaciones});
        } catch (error) {
            res.status(500).json({message: 'Error al obtener habitaciones'});
        }
    }

    static async deleteHabitacion(req, res) {
        const {id} = req.params; // Obtener el id de la habitación desde req.params
        try {
            const result = await habitacionModel.deleteHabitacion(id);
            if (result.affectedRows === 0) {
                return res
                    .status(404)
                    .json({message: 'Habitación no encontrada'});
            }
            res.status(200).json({
                message: 'Habitación eliminada exitosamente',
            });
        } catch (error) {
            console.error('Error al eliminar la habitación:', error);
            res.status(500).json({message: 'Error al eliminar la habitación'});
        }
    }
}

export default habitacionController;
