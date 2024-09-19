import {Router} from 'express';
import activitiesController from '../controllers/activities.controller.js';
import uploadImages from '../middlewares/imgsActivities.middleware.js';

// Crear una instancia de Router para gestionar las rutas de actividades
const routerActivity = Router();

// Ruta para mostrar todas las actividades
routerActivity.get('/activities', activitiesController.listActivity);
// Ruta para crear una nueva actividad
routerActivity.post('/createactivity', activitiesController.createActivity);
// ruta para actualizar una actividad
routerActivity.post('/updateactivity/:id', activitiesController.updateActivity);
// Ruta para subir imágenes de una actividad específica
routerActivity.post(
    '/activity/subidaIMG/:id/upload',
    uploadImages,
    activitiesController.uploadImages,
);

export default routerActivity;
