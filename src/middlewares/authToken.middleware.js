import {jwtVerify} from 'jose';
import {TextEncoder} from 'util';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js';

dotenv.config(); // Configurar las variables de entorno

// Clave secreta para firmar los tokens (debería ser una variable de entorno en producción)
const secretKey = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY); // Codificar la clave secreta en formato UTF-8

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Obtener el token de la cookie

    if (!token) {
        console.log('No token found. Redirecting to login.');
        res.locals.isAuthenticated = false; // Usuario no autenticado
        return res.redirect('/'); // Redirigir a la página de inicio de sesión
    }

    try {
        // Verificar el token JWT con la clave secreta y obtener la información del usuario
        const {payload} = await jwtVerify(token, secretKey);
        req.user = payload; // Guardar la información del usuario decodificada en req.user

        // Verificar si el guid del usuario existe
        const user = await UserModel.getUserByGuid(payload.guid);

        if (!user) {
            console.log(
                'User not found in the database. Redirecting to login.',
            );
            res.locals.isAuthenticated = false; // No autenticado
            return res.status(403).json({message: 'Usuario no encontrado.'}); // Responder con un error 403
        }

        // Si el usuario existe, establecer isAuthenticated en true
        req.user = user; // Guardar la información del usuario en req.user para su uso posterior
        res.locals.isAuthenticated = true; // Usuario autenticado

        console.log('User authenticated successfully.', user.idRol);
        next(); // Continuar con la siguiente función del middleware o controlador de ruta
    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.locals.isAuthenticated = false; // Usuario no autenticado
        req.user = req.session.user || null; // Usar los datos de la sesión si están disponibles
        next(); // Continuar con la siguiente función de middleware
    }
};

export default authMiddleware;
