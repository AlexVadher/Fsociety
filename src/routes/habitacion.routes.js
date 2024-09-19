import {Router} from 'express';
import habitacionController from '../controllers/habitacion.controller.js';
import habitacionModel from '../models/habitacion.model.js';

const routerHabitacion = Router();

// Ruta para registrar una habitación
routerHabitacion.post(
    '/registerHabitacion',
    habitacionController.registerHabitacion,
);

// Nueva ruta para obtener habitaciones por hotel
routerHabitacion.get('/getHabitacionesByHotel/:hotelId', async (req, res) => {
    try {
        const habitaciones = await habitacionModel.getHabitacionesByHotel(
            req.params.hotelId,
        );
        res.json({habitaciones});
    } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
        res.status(500).json({message: 'Error al obtener las habitaciones'});
    }
});

export default routerHabitacion;
