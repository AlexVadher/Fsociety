import {Router} from 'express';
import authMiddleware from '../middlewares/authToken.middleware.js'; // Importar el middleware de autenticación
import userController from '../controllers/user.controller.js'; // Importar el controlador de usuarios
import AuthController from '../controllers/auth.controller.js'; // Importar el controlador de autenticación

const userRouter = Router(); // Inicializar el enrutador de express

// registrar un nuevo usuario
userRouter.post('/register', userController.registerUser);

// Iniciar sesión en la aplicación
userRouter.post('/login', AuthController.login);

// vista protegida para usuarios autenticados
userRouter.get('partials/', authMiddleware, userController.getUserProfile);

// Ruta de admin protegida para usuarios autenticados
userRouter.get('/admin/dashboard', authMiddleware, (req, res) => {
    res.render('admin/dashboard');
});

// Ruta para editar el perfil del usuario
userRouter.get(
    '/profile/profileEdit',
    authMiddleware,
    userController.getUserData,
);

// Ruta para actualizar el perfil del usuario
userRouter.post(
    '/profile/update/:id',
    authMiddleware,
    userController.editUserProfile,
);

// Cerrar sesión y eliminar la cookie del token
userRouter.get('/logout', authMiddleware, AuthController.logout);

// ruta pora enviar la lista de usuarios
userRouter.get('/', userController.getUsers);
export default userRouter;
