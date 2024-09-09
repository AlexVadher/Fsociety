import {jwtVerify} from 'jose';
import {TextEncoder} from 'util';
import dotenv from 'dotenv';
import UserModel from '../models/user.model.js'; // Importar el modelo de usuario

dotenv.config(); // Configurar las variables de entorno

// Middleware para verificar la autenticación del usuario con JWT (JSON Web Token)
/* const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Obtener el token de la cookie

    if (!token) {
        return res
            .status(401)
            .json({message: 'Acceso no autorizado, token requerido.'});
    }

    try {
        // Verificar el token JWT con la clave secreta y obtener la información del usuario
        const {payload} = await jwtVerify(token, secretKey);
        req.user = payload; // Guardar la información del usuario decodificada en req.user

        // Verificar si el guid del usuario existe en la base de datos
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE guid = ?',
            [payload.guid],
        );

        if (rows.length === 0) {
            return res.status(403).json({message: 'Usuario no encontrado.'});
        }
        req.user = rows[0]; // Guardar la información del usuario en req.user para su uso posterior
        next(); // Continuar con la siguiente función del middleware o controlador de ruta
    } catch (err) {
        console.error('Error al verificar el token:', err); // Log para verificar el error
        return res.status(403).json({message: 'Token inválido.'});
    }
}; */

// Clave secreta para firmar los tokens (debería ser una variable de entorno en producción)
const secretKey = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY); // Codificar la clave secreta en formato UTF-8
/* 
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Obtener el token de la cookie

    if (!token) {
        res.locals.isAuthenticated = false; // Usuario no autenticado
        next(); // Continuar a la siguiente función (no se detiene)
        return;
    }

    try {
        // Verificar el token JWT con la clave secreta y obtener la información del usuario
        const {payload} = await jwtVerify(token, secretKey);
        req.user = payload; // Guardar la información del usuario decodificada en req.user

        // Verificar si el guid del usuario existe en la base de datos
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE guid = ?',
            [payload.guid],
        );

        if (rows.length === 0) {
            res.locals.isAuthenticated = false; // No autenticado
            return res.status(403).json({message: 'Usuario no encontrado.'});
        }

        // Si el usuario existe, establecer isAuthenticated en true
        req.user = rows[0]; // Guardar la información del usuario en req.user para su uso posterior
        res.locals.isAuthenticated = true; // Usuario autenticado

        next(); // Continuar con la siguiente función del middleware o controlador de ruta
    } catch (err) {
        console.error('Error al verificar el token:', err); // Log para verificar el error
        res.locals.isAuthenticated = false; // No autenticado
        next(); // Continuar a la siguiente función (no se detiene)
    }
}; */

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

        console.log('User authenticated successfully.');
        next(); // Continuar con la siguiente función del middleware o controlador de ruta
    } catch (err) {
        console.error('Error al verificar el token:', err); // Log para verificar el error
        res.locals.isAuthenticated = false; // No autenticado
        res.redirect('/'); // Redirigir a la página de inicio de sesión
    }
};

export default authMiddleware;
