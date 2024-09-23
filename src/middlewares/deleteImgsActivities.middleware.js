import fs from 'fs';
import path, {join} from 'path';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import ActivityModel from '../models/activities.model.js';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para eliminar las imágenes asociadas a una actividad
const deleteActivityImages = async (req, res, next) => {
    try {
        const {id} = req.params;

        // Obtener las imágenes asociadas a la actividad
        const images = await ActivityModel.getImagesByActivityId(id);

        if (!images || images.length === 0) {
            console.log('No se encontraron imágenes asociadas');
            return next();
        }

        // Eliminar las imágenes del sistema de archivos
        images.forEach((image) => {
            const imagePath = join(
                __dirname,
                '..',
                '..',
                'public',
                image.urlImg,
            );

            // Verificar si el archivo existe y eliminarlo
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(imagePath, (err) => {
                        if (err) {
                            console.error('Error al eliminar la imagen:', err);
                        } else {
                            console.log('Imagen eliminada:', imagePath);
                        }
                    });
                } else {
                    console.log('El archivo no existe:', imagePath);
                }
            });
        });

        // Continuar con la siguiente función middleware
        next();
    } catch (err) {
        console.error(
            'Error en el middleware de eliminación de imágenes:',
            err,
        );
        res.status(500).json({
            message: 'Error al eliminar las imágenes de la actividad',
        });
    }
};

export default deleteActivityImages;
