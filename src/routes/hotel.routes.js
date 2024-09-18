import {Router} from 'express';
import hotelController from '../controllers/hotel.controller.js';
import uploadImages from '../middlewares/imgsHotels.middleware.js';

const routerHotel = Router();

// Ruta para registrar un hotel nuevo
routerHotel.post('/registerHotel', hotelController.registerHotel);
// Ruta para listar todos los hoteles registrados
routerHotel.get('/admin/hotels', hotelController.listHotels);
// Ruta para subir imágenes de un hotel específico
routerHotel.post(
    '/hotel/subidaIMG/:id/upload',
    uploadImages,
    hotelController.uploadImages,
);

export default routerHotel;
