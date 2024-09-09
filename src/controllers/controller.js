import {Router} from 'express';
import {SignJWT} from 'jose';
import pool from '../config/database.js';
import argon2 from 'argon2'; // hash de contraseñas

// Crear un nuevo usuario en la base de datos
/* export const registerUser = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            contraseña,
            telefono,
            genero,
            orientacionSexual,
            pais,
            idRol,
        } = req.body;

        // Generar un GUID para el id del usuario
        const guid = uuidv4();

        // Generar un hash para la contraseña antes de almacenarla
        const hashedPassword = await argon2.hash(contraseña);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol, guid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                nombre,
                apellido,
                correo,
                hashedPassword,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
                guid,
            ],
        );

        res.redirect('/'); // Redirigir a la página de inicio de sesión
        /*  res.status(201).json({
            message: 'Usuario registrado exitosamente',
            userId: result.insertId,
        }); 
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}; 

/* export const login = async (req, res) => {
    try {
        const {correo, password} = req.body; // ontener datos de la solicitud POST del formulario de inicio de sesión

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Usuario no encontrado o contraseña incorrecta.',
            });
        }

        const user = rows[0];
        const passwordMatch = await argon2.verify(user.contraseña, password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Usuario no encontrado o contraseña incorrecta.',
            });
        }
        // Generar un token JWT para el usuario autenticado con una duración de 1 hora
        const jwtConstructor = new SignJWT({guid: user.guid});
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        console.log('Token JWT:', jwt); // Verifica el token generado

        // Guardar el token en una cookie
        res.cookie('token', jwt, {
            httpOnly: true, // Asegura que la cookie no sea accesible desde JavaScript en el navegador
            secure: process.env.NODE_ENV === 'production', // Asegura que la cookie solo se envíe a través de HTTPS en producción
            maxAge: 3600000, // 1 hora en milisegundos
        });

        // Enviar el token y una indicación de éxito
        return res.json({jwt, success: true}); // Añadir una clave 'success' para indicar éxito
    } catch (err) {
        console.error('Error durante la autenticación:', err);
        return res.sendStatus(500);
    }
}; */

// Crear un nuevo router para manejar las rutas de autenticación
const authTokenRouter = Router();

// Ruta para login de usuarios
authTokenRouter.get('/login', (req, res) => {
    try {
        res.render('users/login');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

authTokenRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        // Verificar si el usuario existe en la base de datos
        const [rows] = await pool.query(
            'SELECT * FROM usuarios WHERE correo = ?',
            [email],
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Usuario no encontrado o contraseña incorrecta.',
            }); // No autorizado
        }

        const user = rows[0];

        // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
        const passwordMatch = await argon2.verify(user.contraseña, password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Usuario no encontrado o contraseña incorrecta.',
            }); // No autorizado
        }

        // const guid = user.guid; // Obtener el GUID del usuario

        // Generar el token JWT con el GUID
        const jwtConstructor = new SignJWT({guid: user.guid});

        // Crear un codificador de texto para la clave secreta del token
        const encoder = new TextEncoder(); // Codificador de texto para la clave secreta del token
        const jwt = await jwtConstructor // Firmar el token con la clave secreta y configurar la expiración
            .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        return res.json({jwt}); // Enviar el token JWT al cliente
    } catch (err) {
        console.error('Error durante la autenticación:', err); // Log para verificar el error
        return res.sendStatus(500); // Error interno del servidor
    }
});

export default authTokenRouter;
