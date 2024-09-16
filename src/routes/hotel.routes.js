import {Router} from 'express';
import hotelController from '../controllers/hotel.controller.js';

const hotelRouter = Router();

hotelRouter.post('/register.hotel', hotelController.registerHotel);

hotelRouter.put('/update/:id', hotelController.updateHotel);

hotelRouter.delete('/delete/:id', hotelController.deleteHotel);

hotelRouter.get('/list', hotelController.listHotels);

export default hotelRouter;