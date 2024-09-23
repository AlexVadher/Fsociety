import UserModel from '../models/user.model.js';

// Controlador de usuario y sus métodos
export class userController {
    // Método para registrar un nuevo usuario
    static async registerUser(req, res) {
        try {
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

            // Verificar si el correo ya existe
            const existingUser = await UserModel.getUserByEmail(correo);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message:
                        'El correo electrónico ya está registrado. Por favor, use otro correo.',
                });
            }

            // Asignar una ruta de archivo por defecto si no se ha subido ningún archivo
            const avatarUrl = req.file
                ? `/uploads/avatars/${req.file.filename}`
                : '/uploads/avatars/default-avatar.jpg';

            // Verificar que avatarUrl se ha definido correctamente
            if (!avatarUrl) {
                return res.status(400).json({
                    success: false,
                    message: 'Error al obtener la URL del avatar',
                });
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
                avatarUrl,
            });

            console.log('Resultado de la creación del usuario:', result); // Registro de resultado

            return res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).json({
                success: false,
                message: 'Hubo un error al registrar el usuario',
                error: err.message, // Proporcionar más información sobre el error
            });
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

            // Definir elementos del menú dinámicamente
            const menuItems = [
                {
                    name: 'Editar Perfil',
                    link: `/profile/editProfile/${user.guid}`,
                    icon: 'fas fa-user-edit',
                    active: currentPath.includes('/profile/editProfile/'),
                },
                {
                    name: 'Configuración',
                    link: `/profile/settings/${user.guid}`,
                    icon: 'fas fa-cog',
                    active: currentPath.includes('/profile/settings'),
                },
                // Puedes añadir más elementos según sea necesario
            ];

            // Definir las opciones de orientación sexual
            const orientaciones = [
                'Heterosexual',
                'Homosexual',
                'Bisexual',
                'Asexual',
                'Otro',
            ];
            // Definir las opciones de género
            const generos = ['Masculino', 'Femenino', 'No binario', 'Otro'];

            // Activar dinámicamente el enlace actual
            menuItems.forEach((item) => {
                if (item.link === currentPath) {
                    item.active = true;
                }
            });

            // Renderizar la vista de edición de perfil con los datos del usuario y los elementos del menú de navegación
            res.render('users/editProfile', {
                generos,
                orientaciones,
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
            } = req.body;

            console.log('Datos recibidos para editar:', req.body); // Registro de datos

            // Verificar que todos los campos requeridos estén presentes
            if (
                !id ||
                !nombre ||
                !apellido ||
                !correo ||
                !telefono ||
                !genero ||
                !orientacionSexual ||
                !pais
            ) {
                return res.status(400).json({
                    message: 'Todos los campos son obligatorios',
                    req: req.body,
                });
            }

            // Crear un objeto con los datos del usuario
            const userData = {
                nombre,
                apellido,
                correo,
                telefono,
                genero,
                orientacionSexual,
                pais,
            };
            // Llamar al método updateUser de la clase UserModel
            const result = await UserModel.updateUser(id, userData);

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
            /* return res.status(200).json({
                message: 'Contraseña actualizada exitosamente',
                body: updateResult,
            }); */

            // Cerrar la sesion y redirigir a la página de inicio de sesión
            res.clearCookie('connect.sid'); // Eliminar la cookie de sesión
            res.clearCookie('token'); // Eliminar la cookie del token
            res.redirect('/'); // Redirigir a la página de inicio
        } catch (err) {
            console.error('Error al validar la contraseña:', err); // Mejorar el registro de errores
            return res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
        }
    }
}

export default userController;
