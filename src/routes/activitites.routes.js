import {Router} from 'express';
import pool from '../config/database.js';
import activitiesController from '../controllers/activities.controller.js';
const routerActivity = Router();

// Definir las rutas usando el controlador
/*router.get('/items', activitiesController.getAllItems);
router.get('/items/:id', activitiesController.getItemById);
router.post('/items', activitiesController.createItem);
router.put('/items/:id', activitiesController.updateItem);
router.delete('/items/:id', activitiesController.deleteItem);*/
routerActivity.post('/createactivity', activitiesController.createActivity);
// mostrar formulario actividad 
routerActivity.get(
    '/profile/activities/',
    (req, res) => {
        res.render('activities/activity');
    },
);
export default routerActivity;
