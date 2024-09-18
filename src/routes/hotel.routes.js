import {Router} from 'express';
import hotelController from '../controllers/hotel.controller.js';

const routerHotel = Router();

routerHotel.post('/registerHotel', hotelController.registerHotel);

routerHotel.get('/admin/hotels', hotelController.listHotels);

export default routerHotel;
