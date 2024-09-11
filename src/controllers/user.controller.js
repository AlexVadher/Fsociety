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

            // validamos la informacion en consola
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

    // Controlador para editar el perfil del usuario
    static async getUserData(req, res) {
        try {
            const {id} = req.user;
            const user = await UserModel.getUserById(id);
            console.log('Datos del usuario:', user);

            // Obtener la ruta actual del request
            const currentPath = req.path;

            res.render('users/profileEdit', {
                user,
                layout: 'profile',
                currentPath,
            });
        } catch (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res
                .status(500)
                .json({message: 'Error interno del servidor.'});
        }
    }

    // Método para actualizar la información del usuario
    static async editUserProfile(req, res) {
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

    // Método para validar la contraseña actual del usuario y actualizarla si es correcta
    /* static async validatePassword(req, res) {
        try {
            // Obtener el id del usuario desde req.user
            const {id} = req.user;

            // Obtener la contraseña actual desde req.body
            const {currentPassword} = req.body;

            // Llamar al método validatePassword de la clase UserModel
            const result = await UserModel.validatePassword({
                id,
                currentPassword,
            });

            if (!result) {
                // si la contraseña no es valida se envia un mensaje de error
                return res.status(400).json({
                    message: 'Contraseña incorrecta',
                });
            } else {
                // si la contraseña es valida se actualiza la contraseña del usuario

                // Obtener la nueva contraseña desde req.body
                const {newPassword} = req.body;

                // Llamar al método updatePassword de la clase UserModel
                const result = await UserModel.updatePassword({
                    id,
                    newPassword,
                });
            }
            console.log(
                'Resultado de la actualización de la contraseña:',
                result,
            ); // Registro de resultado

            res.status(200).json({
                message: 'Contraseña actualizada exitosamente',
                body: result,
            });

            console.log('Resultado de la validación de la contraseña:', result); // Registro de resultado

            res.status(200).json({
                message: 'Contraseña validada exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al validar la contraseña:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    } */

    // Método para validar la contraseña actual del usuario y actualizarla si es correcta
    static async validatePassword(req, res) {
        try {
            // Obtener el id del usuario desde req.user
            const {id} = req.user;

            // Obtener la contraseña actual y la nueva contraseña desde req.body
            const {currentPassword, newPassword} = req.body;

            // Validar la contraseña actual llamando al método validatePassword de la clase UserModel
            const isValidPassword = await UserModel.validatePassword({
                id,
                currentPassword,
            });

            if (!isValidPassword) {
                // Si la contraseña no es válida, enviar un mensaje de error
                return res.status(400).json({
                    message: 'Contraseña incorrecta',
                });
            }

            // Si la contraseña es válida, actualizar la contraseña del usuario
            const updateResult = await UserModel.updatePassword({
                id,
                newPassword,
            });

            // renderizar la vista de cambio de contraseña con un mensaje de exito en la actualizacion
            res.render('partials/changePassword', {
                message: 'Contraseña actualizada exitosamente',
            });

            console.log(
                'Resultado de la actualización de la contraseña:',
                updateResult,
            ); // Registro de resultado

            // Enviar una respuesta exitosa
            return res.status(200).json({
                message: 'Contraseña actualizada exitosamente',
                body: updateResult,
            });
        } catch (err) {
            console.error('Error al validar la contraseña:', err); // Mejorar el registro de errores
            return res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
        }
    }
    // Método para eliminar un usuario
    static async deleteUser(req, res) {
        try {
            // Obtener el id del usuario desde req.params
            const {id} = req.params;

            // Llamar al método deleteUser de la clase UserModel
            const result = await UserModel.deleteUser(id);

            console.log('Resultado de la eliminación del usuario:', result); // Registro de resultado

            res.status(200).json({
                message: 'Usuario eliminado exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al eliminar el usuario:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }

    /* static async listClientes(req, res) {
        try {
            const clientes = await ClienteDAO.getAll();
            res.render('personas/list', {clientes});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    } */

    // Método para obtener la lista de usuarios
    static async getUsers(req, res) {
        try {
            // Llamar al método getUsers de la clase UserModel
            const users = await UserModel.getUsers();

            console.log('Lista de usuarios:', users); // Registro de resultado
            res.render('index', {users}); // Asegúrate de pasar la lista de usuarios a la vista
        } catch (err) {
            console.error('Error al obtener la lista de usuarios:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }
}

export default userController;
