import {Router} from 'express';
import axios from 'axios';
import authMiddleware from '../middlewares/authToken.middleware.js'; // Importar el middleware de autenticación
import userController from '../controllers/user.controller.js'; // Importar el controlador de usuarios
import AuthController from '../controllers/auth.controller.js'; // Importar el controlador de autenticación
import roleMiddleware from '../middlewares/role.middleware.js'; // Importar el middleware de roles
import uploadAvatar from '../middlewares/uploadAvatar.middleware.js'; // Importar el middleware de subida de avatares
import deleteOldAvatar from '../middlewares/deleteAvatar.middleware.js'; // Importar el middleware de eliminación de avatares
import fetchCountries from '../middlewares/countries.middleware.js'; // Importar el middleware de países

const userRouter = Router(); // Inicializar el enrutador de express

// Iniciar sesión en la aplicación
userRouter.post('/login', AuthController.login);

// Cerrar sesión y eliminar la cookie del token
userRouter.get('/logout', authMiddleware, AuthController.logout);

// registrar un nuevo usuario
userRouter.post('/register', uploadAvatar, userController.registerUser);

// Ruta para listar los países
userRouter.get('/countries', fetchCountries, (req, res) => {
    res.json(req.countries);
});

// Ruta para actualizar el avatar del usuario
userRouter.post(
    '/upload/:id',
    deleteOldAvatar,
    uploadAvatar,
    userController.updateUserAvatar,
);

// Ruta de admin protegida para usuarios autenticados
userRouter.get(
    '/admin/dashboard/',
    authMiddleware,
    roleMiddleware('1'),
    (req, res) => {
        res.render('admin/dashboard', {user: req.user, layout: 'admin'});
    },
);

// mostrar formulario actividades
userRouter.get('/profile/activities/:guid', (req, res) => {
    res.render('user/activities', {user: req.user});
});

// Ruta para obtener los datos del perfil del usuario
userRouter.get(
    '/profile/editProfile/:guid',
    authMiddleware,
    userController.getUserData,
);

// Ruta para actualizar datos del perfil del usuario
userRouter.post(
    '/profile/update/:id',
    authMiddleware,
    userController.editUserProfile,
);

// Ruta para cambiar la contraseña del usuario
/* userRouter.get(
    '/profile/changePassword/:guid',
    authMiddleware,
    userController.renderChangePassword,
); */

// Ruta para actualizar la contraseña del usuario
userRouter.post(
    '/profile/changePassword/:id',
    authMiddleware,
    userController.changePassword,
);

// Ruta para la configuración del usuario
userRouter.get(
    '/profile/settings/:id',
    authMiddleware,
    userController.renderSettings,
);

// userRouter.get('/profile/settings', authMiddleware, userController.settings);

// ruta para lista de hoteles
userRouter.get('/amdmin/hotels', (req, res) => {
    res.render('hotels/hotels');
});
export default userRouter;
