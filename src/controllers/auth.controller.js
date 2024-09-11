import argon2 from 'argon2';
import {SignJWT} from 'jose/jwt/sign';
import {TextEncoder} from 'util';
import UserModel from '../models/user.model.js';

export class AuthController {
    /* static async login(req, res) {
        try {
            const {correo, password} = req.body;

            // llamar al método getUserByEmail de la clase UserModel
            const user = await UserModel.getUserByEmail(correo);

            // Verificar si la contraseña proporcionada coincide con el hash almacenado en la base de datos
            const passwordMatch = await argon2.verify(
                user.contraseña,
                password,
            );

            // Validamos si el usuario no existe o la contraseña es incorrecta
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

            console.log('Cookie token en login:', req.cookies.token); // Añadir esta línea en AuthController.login
            // validar el rol del usuario y redirigir a la página correspondiente
            if (user.idRol === 1) {
                return res.render('admin/dashboard');
            } else {
                return res.redirect('/');
            }

            // Enviar el token y una indicación de éxito
            // return res.json({jwt, success: true}); // Añadir una clave 'success' para indicar éxito
        } catch (err) {
            console.error('Error durante la autenticación:', err);
            return res.sendStatus(500);
        }
    } */

    static async login(req, res) {
        try {
            const {correo, password} = req.body; // Obtener el correo y la contraseña del cuerpo de la solicitud(formulario de inicio de sesión)
            const user = await UserModel.getUserByEmail(correo); // Obtener el usuario por correo electrónico del metodo en el userModel

            // Verificar si la contraseña proporcionada coincide con el hash almacenado en la base de datos
            const passwordMatch = await argon2.verify(
                user.contraseña,
                password,
            );

            // Validamos si el usuario no existe o la contraseña es incorrecta
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'Usuario no encontrado o contraseña incorrecta.',
                });
            }

            // Generar un token JWT para el usuario autenticado con una duración de 1 hora

            // constructor de token JWT con el GUID y el nombre del usuario (se guarda en el header del token JWT)
            const jwtConstructor = new SignJWT({
                guid: user.guid,
                username: user.nombre,
            });
            const encoder = new TextEncoder(); // Crear un nuevo codificador de texto para codificar la clave secreta en formato UTF-8
            const jwt = await jwtConstructor // Crear el token JWT con el GUID y el nombre del usuario y firmar el token JWT con la clave secreta
                .setProtectedHeader({alg: 'HS256', typ: 'JWT'}) // Establecer el encabezado protegido del token JWT con el algoritmo y el tipo de token JWT
                .setIssuedAt() // Establecer la fecha de emisión del token JWT
                .setExpirationTime('1h') // Establecer la fecha de expiración del token JWT en 1 hora
                .sign(encoder.encode(process.env.JWT_PRIVATE_KEY)); // Firmar el token JWT con la clave secreta

            console.log('Token JWT:', jwt); // Verifica el token generado

            // Guardar el token en una cookie
            res.cookie('token', jwt, {
                httpOnly: true, // Asegura que la cookie no sea accesible desde JavaScript en el navegador
                secure: process.env.NODE_ENV === 'production', // Asegura que la cookie solo se envíe a través de HTTPS en producción
                maxAge: 3600000, // 1 hora en milisegundos
            });

            // Guardar los datos del usuario en la sesión
            req.session.user = {
                id: user.guid,
                nombre: user.nombre,
                correo: user.correo,
                idRol: user.idRol,
                // Otros datos relevantes del usuario
            };

            console.log('Cookie token en login:', req.cookies.token); // Verificar la cookie
            console.log('Sesión de usuario en login:', req.session.user); // Verificar la sesión del usuario

            // Redirigir a la página correspondiente según el rol del usuario
            if (user.idRol === 1) {
                return res.redirect('/admin/dashboard/'); // Redirigir a la página de administrador
            } else {
                return res.redirect('/'); // Redirigir a la página de inicio
            }
        } catch (err) {
            console.error('Error durante la autenticación:', err);
            return res.sendStatus(500);
        }
    }

    // Método para cerrar sesión y eliminar la cookie del token
    static async logout(req, res) {
        req.session.destroy(); // Destruir la sesión
        res.clearCookie('token'); // Eliminar la cookie del token
        res.redirect('/'); // Redirigir a la página de inicio
    }
}

export default AuthController;
