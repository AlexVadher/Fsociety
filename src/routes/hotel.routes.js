import {Router} from 'express';
import hotelController from '../controllers/hotel.controller.js';

const hotelRouter = Router();

hotelRouter.post('/registerHotel/', hotelController.registerHotel);

hotelRouter.put('/update/:id', hotelController.updateHotel);

hotelRouter.delete('/delete/:id', hotelController.deleteHotel);

hotelRouter.get('/list', hotelController.listHotels);

export default hotelRouter;