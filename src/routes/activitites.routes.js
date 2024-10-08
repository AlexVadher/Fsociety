import {Router} from 'express';
import activitiesController from '../controllers/activities.controller.js';
import uploadImages from '../middlewares/imgsActivities.middleware.js';
import deleteActivityImages from '../middlewares/deleteImgsActivities.middleware.js';
import authMiddleware from '../middlewares/authToken.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

// Crear una instancia de Router para gestionar las rutas de actividades
const routerActivity = Router();

// Ruta para crear una nueva actividad
routerActivity.post(
    '/admin/createActivity',
    activitiesController.createActivity,
);
// Ruta para mostrar todas las actividades
routerActivity.get(
    '/admin/ListActivities',
    authMiddleware,
    roleMiddleware('1'),
    activitiesController.listActivity,
);
// Ruta para actualizar una actividad
routerActivity.post(
    '/admin/updateactivity/:id',
    activitiesController.updateActivity,
);
// Ruta para mostrar una actividad por ID
routerActivity.get(
    '/details/activity/:id',
    activitiesController.listActivityById,
);
// Ruta para mostrar la vista de reservar una actividad
routerActivity.get(
    '/details/activity/reserve/:nombre/:id',
    activitiesController.detailActivity,
);
// Ruta para reservar una actividad
routerActivity.post(
    '/activity/reservation/:id',
    activitiesController.reserveActivity,
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
// Ruta para eliminar una actividad por ID
routerActivity.get(
    '/admin/deleteActivity/:id',
    deleteActivityImages,
    activitiesController.deleteActivity,
);

export default routerActivity;
