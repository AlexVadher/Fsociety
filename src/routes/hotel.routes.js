import {Router} from 'express';
import hotelController from '../controllers/hotel.controller.js';
import habitacionController from '../controllers/habitacion.controller.js';
import uploadImages from '../middlewares/imgsHotels.middleware.js';
import deleteHotelImages from '../middlewares/deleteImgsHotel.middleware.js';

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
routerHotel.post('/updateHotel/:id', hotelController.updateHotel);

routerHotel.get('/ListHotelHome', hotelController.listHotelImages);

routerHotel.get(
    '/admin/deleteHotel/:id',
    deleteHotelImages,
    hotelController.deleteHotel,
);
routerHotel.get(
    '/details/hotel/reserve/:nombre/:id',
    hotelController.reserveHotel,
);

routerHotel.get('/details/hotel/:id', hotelController.listHotelById);

routerHotel.get(
    '/habitaciones/:hotelId',
    habitacionController.getHabitacionesByHotel,
);

export default routerHotel;
