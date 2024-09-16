import UserModel from '../models/user.model.js';

// Controlador de usuario y sus métodos
export class userController {
    // Método para registrar un nuevo usuario
    static async registerUser(req, res) {
        try {
            // Obtener los datos del formulario de registro desde req.body y validarlos
            const {
                nombre,
                apellido,
                correo,
                contrasena,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
            } = req.body;

            if (!req.file) {
                return res
                    .status(400)
                    .json({message: 'No se ha subido ningún archivo'});
            }

            // Obtener la URL del avatar
            const avatarUrl = `/uploads/avatars/${req.file.filename}`;

            // Verificar que avatarUrl se ha definido correctamente
            if (!avatarUrl) {
                return res
                    .status(400)
                    .json({message: 'Error al obtener la URL del avatar'});
            }

            console.log('Datos recibidos:', req.body, req.file); // Registro de datos

            // Llamar al método createUser de la clase UserModel
            const result = await UserModel.createUser({
                nombre,
                apellido,
                correo,
                contrasena,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
                avatarUrl, // Pasar la ruta del avatar
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
    /*  static async registerUser(req, res) {
        try {
            // Verificar si se ha subido un archivo
            if (!req.file) {
                return res
                    .status(400)
                    .json({message: 'No se ha subido ningún archivo'});
            }

            // Obtener la URL del avatar
            const avatarUrl = `/uploads/avatars/${req.file.filename}`;

            // Verificar que avatarUrl se ha definido correctamente
            if (!avatarUrl) {
                return res
                    .status(400)
                    .json({message: 'Error al obtener la URL del avatar'});
            }

            // Obtener los datos del cuerpo de la solicitud
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

            // Registrar los datos para depuración
            console.log({
                nombre,
                apellido,
                correo,
                contraseña,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
                avatarUrl,
            });
            // Verificar que todos los campos requeridos estén presentes
            if (
                !nombre ||
                !apellido ||
                !correo ||
                !contraseña ||
                !telefono ||
                !genero ||
                !orientacionSexual ||
                !pais ||
                !idRol
            ) {
                return res
                    .status(400)
                    .json({message: 'Todos los campos son obligatorios'});
            }

            // Crear el usuario en la base de datos
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
                avatarUrl,
            });

            res.status(201).json({
                message: 'Usuario creado exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({message: 'Error al crear el usuario'});
        }
    } */

    // Controlador para editar el perfil del usuario
    static async getUserData(req, res) {
        try {
            const {id} = req.user;
            const user = await UserModel.getUserById(id);
            console.log('Datos del usuario:', user);

            // Obtener la ruta actual del request
            const currentPath = req.path;

            // Definir elementos del menú dinámicamente
            const menuItems = [
                {
                    name: 'Editar Perfil',
                    link: `/profile/editProfile/${user.guid}`,
                    icon: 'fas fa-user-edit',
                    active: currentPath.includes('/profile/editProfile/'),
                },
                {
                    name: 'Cambiar Contraseña',
                    link: `/profile/changePassword/${user.guid}`,
                    icon: 'fas fa-key',
                    active: currentPath.includes(
                        '/profile/changePassword/:guid',
                    ),
                },
                {
                    name: 'Configuración',
                    link: `/profile/settings/${user.guid}`,
                    icon: 'fas fa-cog',
                    active: currentPath.includes('/profile/settings'),
                },
                // Puedes añadir más elementos según sea necesario
            ];

            // Activar dinámicamente el enlace actual
            menuItems.forEach((item) => {
                if (item.link === currentPath) {
                    item.active = true;
                }
            });

            // Renderizar la vista de edición de perfil con los datos del usuario y los elementos del menú de navegación
            res.render('users/editProfile', {
                user,
                layout: 'main',
                title: 'Perfil de Usuario',
                currentPath,
                menuItems: menuItems,
            });
        } catch (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res
                .status(500)
                .json({message: 'Error interno del servidor.'});
        }
    }

    // Método para actualizar el avatar del usuario
    static async updateUserAvatar(req, res) {
        try {
            // Obtener el id del usuario desde req.params
            const {id} = req.params;
            console.log('Datos recibidos:', req.file); // Registro de datos

            // Verificar si se ha subido un archivo
            if (!req.file) {
                return res
                    .status(400)
                    .json({message: 'No se ha subido ningún archivo'});
            }

            // Obtener la URL del avatar
            const avatar = `/uploads/avatars/${req.file.filename}`;

            // obtener la url del avatar actual del usuario para eliminarlo
            const user = await UserModel.getUserById(id);

            // verificar en consola avatar actual
            console.log('Avatar actual:', user.avatarUrl);

            // Llamar al método updateAvatar de la clase UserModel
            const result = await UserModel.updateAvatar({id, avatar});

            console.log('Resultado de la actualización del avatar:', result); // Registro de resultado

            // actualizar el avatar en la sesion del usuario para que se muestre en la vista
            // Actualizar la sesión del usuario
            req.session.user.avatarUrl = avatar;

            // Verificar si se actualizó alguna fila
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Usuario no encontrado o avatar no actualizado',
                });
            }

            /* res.status(200).json({
                message: 'Avatar actualizado exitosamente',
                body: result,
            }); */

            // si se actualiza el avatar se elimina el avatar anterior entonces se recarga la pagina
            res.redirect('/profile/editProfile/:guid');
        } catch (err) {
            console.error('Error al actualizar el avatar:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
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

    // Método para la configuración del perfil del usuario
    static async renderSettings(req, res) {
        try {
            const {id} = req.user;
            const user = await UserModel.getUserById(id);

            // Obtener la ruta actual del request
            const currentPath = req.path;

            // Definir elementos del menú dinámicamente
            const menuItems = [
                {
                    name: 'Editar Perfil',
                    link: `/profile/editProfile/${user.guid}`,
                    icon: 'fas fa-user-edit',
                    active: currentPath.includes('/profile/editProfile/:guid'),
                },
                {
                    name: 'Cambiar Contraseña',
                    link: `/profile/changePassword/${user.guid}`,
                    icon: 'fas fa-key',
                    active: currentPath.includes(
                        '/profile/changePassword:guid',
                    ),
                },
                {
                    name: 'Configuración',
                    link: `/profile/settings/${user.guid}`,
                    icon: 'fas fa-cog',
                    active: currentPath.includes('/profile/settings'),
                },
            ];

            // Renderizar la vista de configuración
            res.render('users/settings', {
                user,
                layout: 'main',
                title: 'Configuración',
                currentPath,
                menuItems,
            });
        } catch (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res
                .status(500)
                .json({message: 'Error interno del servidor.'});
        }
    }

    // Método para renderizar la vista de cambio de contraseña
    static async renderChangePassword(req, res) {
        try {
            const {id} = req.user;
            const user = await UserModel.getUserById(id);

            // Obtener la ruta actual del request
            const currentPath = req.path;

            // Definir elementos del menú dinámicamente
            const menuItems = [
                {
                    name: 'Editar Perfil',
                    link: `/profile/editProfile/${user.guid}`,
                    icon: 'fas fa-user-edit',
                    active: currentPath.includes('/profile/editProfile/:guid'),
                },
                {
                    name: 'Cambiar Contraseña',
                    link: `/profile/changePassword/${user.guid}`,
                    icon: 'fas fa-key',
                    active: currentPath.includes('/profile/changePassword'),
                },
                {
                    name: 'Configuración',
                    link: `/profile/settings/${user.guid}`,
                    icon: 'fas fa-cog',
                    active: currentPath.includes('/profile/settings'),
                },
            ];

            // Renderizar la vista de cambio de contraseña
            res.render('users/changePassword', {
                user,
                layout: 'main',
                title: 'Cambiar Contraseña',
                currentPath,
                menuItems,
            });
        } catch (err) {
            console.error('Error al obtener los datos del usuario:', err);
            return res
                .status(500)
                .json({message: 'Error interno del servidor.'});
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
    static async changePassword(req, res) {
        try {
            const {id} = req.params;
            const {currentPassword, newPassword, confirmNewPassword} = req.body;

            console.log('Datos recibidos:', req.body); // Registro de datos

            // Validar que todos los campos requeridos estén presentes en la solicitud del cliente
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                return res.status(400).json({
                    message: 'Todos los campos son obligatorios',
                    req: req.body,
                    id: id,
                });
            }

            // Verificar que la nueva contraseña y la confirmación coincidan
            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({
                    message: 'Las nuevas contraseñas no coinciden',
                });
            }

            // Validar la contraseña actual del usuario
            const isValidPassword = await UserModel.validatePassword({
                id,
                currentPassword,
            });

            if (!isValidPassword) {
                // Si la contraseña no es válida, enviar un mensaje de error
                return res.status(400).json({
                    message: 'Contraseña actual incorrecta',
                });
            }

            // Si la contraseña es válida, actualizar la contraseña del usuario
            const updateResult = await UserModel.updatePassword({
                id,
                newPassword,
            });

            // Renderizar la vista de cambio de contraseña con un mensaje de éxito en la actualización
            res.render('users/changePassword', {
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
}

export default userController;
