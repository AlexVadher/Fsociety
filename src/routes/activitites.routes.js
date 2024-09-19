import {Router} from 'express';
import activitiesController from '../controllers/activities.controller.js';

// Crear una instancia de Router para gestionar las rutas de actividades
const routerActivity = Router();

// Ruta para mostrar todas las actividades
routerActivity.get('/activities', activitiesController.listActivity);
// Ruta para crear una nueva actividad
routerActivity.post('/createactivity', activitiesController.createActivity);

export default routerActivity;
