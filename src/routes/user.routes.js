import {Router} from 'express';
import authMiddleware from '../middlewares/authToken.middleware.js'; // Importar el middleware de autenticación
import userController from '../controllers/user.controller.js'; // Importar el controlador de usuarios
import AuthController from '../controllers/auth.controller.js'; // Importar el controlador de autenticación

const userRouter = Router(); // Inicializar el enrutador de express

// registrar un nuevo usuario
userRouter.post('/register', authMiddleware, userController.registerUser);

// Iniciar sesión en la aplicación
userRouter.post('/login', AuthController.login);

// vista protegida para usuarios autenticados
userRouter.get('partials/', authMiddleware, userController.getUserProfile);

// ruta de admin protegida para usuarios autenticados
userRouter.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.render('admin/dashboard');
});

// Cerrar sesión y eliminar la cookie del token
userRouter.get('/logout', authMiddleware, AuthController.logout);

export default userRouter;
