import {Router} from 'express';
import activitiesController from '../controllers/activities.controller.js';
import uploadImages from '../middlewares/imgsActivities.middleware.js';

// Crear una instancia de Router para gestionar las rutas de actividades
const routerActivity = Router();

// Ruta para crear una nueva actividad
routerActivity.post(
    '/admin/createActivity',
    activitiesController.createActivity,
);
// Ruta para mostrar todas las actividades
routerActivity.get('/admin/ListActivities', activitiesController.listActivity);
// Ruta para actualizar una actividad
routerActivity.post(
    '/admin/updateactivity/:id',
    activitiesController.updateActivity,
);
// Ruta para subir imágenes de una actividad específica
routerActivity.post(
    '/activity/subidaIMG/:id/upload',
    uploadImages,
    activitiesController.uploadImages,
);
// Ruta para listar en la home de actividades las actividades en general
routerActivity.get(
    '/ListActivitiesHome',
    activitiesController.listActivityImages,
);
// lista con páginación
routerActivity.get(
    '/ListActivitiesHome',
    activitiesController.listActivityImages,
);
export default routerActivity;
