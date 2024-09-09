import UserModel from '../models/user.model.js';

// Renderizar la vista de registro
// Renderizar la vista de registro

export class userController {
    // Método para registrar un nuevo usuario
    static async registerUser(req, res) {
        try {
            // Obtener los datos del formulario de registro desde req.body y validarlos
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

            console.log('Datos recibidos:', req.body);

            // Llamar al método createUser de la clase UserModel
            const result = await UserModel.createUser({
                nombre,
                apellido,
                correo,
                contraseña,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
            });

            console.log('Resultado de la creación del usuario:', result); // Registro de resultado

            res.redirect('/'); // Redirigir a la página de inicio de sesión

            /* res.status(201).json({
                message: 'Usuario registrado exitosamente',
                body: result,
            }); */
        } catch (err) {
            console.error('Error al registrar el usuario:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }

    // Método para obtener el perfil del usuario autenticado
    static async getUserProfile(req, res) {
        try {
            // Obtener la información del usuario desde req.user
            const user = req.user;

            // Verificar si el usuario existe
            if (!user) {
                return res
                    .status(404)
                    .json({message: 'Usuario no encontrado.'});
            }

            // Devolver la información del perfil del usuario
            /* return res.json({
            guid: user.guid,
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            // Añadir otros campos necesarios del perfil del usuario
        }); */
            res.render('partials/profile', {user});
        } catch (err) {
            console.error('Error al obtener el perfil del usuario:', err);
            return res
                .status(500)
                .json({message: 'Error interno del servidor.'});
        }
    }

    // Método para actualizar la información del usuario
    static async updateUser(req, res) {
        try {
            // Obtener el id del usuario desde req.params
            const {id} = req.params;

            // Obtener los datos del formulario de actualización desde req.body
            const {
                nombre,
                apellido,
                correo,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
            } = req.body;

            // Llamar al método updateUser de la clase UserModel
            const result = await UserModel.updateUser({
                id,
                nombre,
                apellido,
                correo,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
            });

            console.log('Resultado de la actualización del usuario:', result); // Registro de resultado

            res.status(200).json({
                message: 'Usuario actualizado exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al actualizar el usuario:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }
}

export default userController;
