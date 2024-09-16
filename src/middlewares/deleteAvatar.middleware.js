import fs from 'fs';
import path from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import UserModel from '../models/user.model.js';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para eliminar el avatar antiguo
const deleteOldAvatar = async (req, res, next) => {
    try {
        const {id} = req.params;

        // Obtener el usuario por id para verificar si tiene un avatar existente y eliminarlo
        const user = await UserModel.getUserById(id);

        if (!user) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        const currentAvatarUrl = user.avatarUrl;

        // Verificar si el avatar es diferente al avatar predeterminado
        if (
            currentAvatarUrl &&
            currentAvatarUrl !== '/uploads/avatars/default-avatar.jpg'
        ) {
            const currentAvatarPath = path.join(
                __dirname,
                '..',
                '..',
                'public',
                currentAvatarUrl,
            );

            // Verificar si el archivo existe y eliminarlo
            fs.access(currentAvatarPath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(currentAvatarPath, (err) => {
                        if (err) {
                            console.error(
                                'Error al eliminar el avatar antiguo:',
                                err,
                            );
                        } else {
                            console.log(
                                'Avatar antiguo eliminado:',
                                currentAvatarPath,
                            );
                        }
                    });
                } else {
                    console.log(
                        'El archivo anterior no existe:',
                        currentAvatarPath,
                    );
                }
            });
        }

        // Continuar con la siguiente función middleware
        next();
    } catch (err) {
        console.error('Error en el middleware de eliminación de avatar:', err);
        res.status(500).json({message: 'Error al eliminar el avatar antiguo'});
    }
};

export default deleteOldAvatar;
