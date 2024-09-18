import {Router} from 'express';
import habitacionController from '../controllers/habitacion.controller.js';

const routerHabitacion = Router();

routerHabitacion.post(
    '/registerHabitacion',
    habitacionController.registerHabitacion,
);

export default routerHabitacion;
