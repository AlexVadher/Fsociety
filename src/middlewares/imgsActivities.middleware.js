import multer from 'multer';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Obtener el id del hotel desde los parámetros de la solicitud
        const activityId = req.params.id;

        // Definir la ruta de la carpeta dinámica basada en el id del hotel
        const activityDir = join(
            __dirname,
            '..',
            '..',
            'public',
            'uploads',
            'activities',
            activityId,
        );

        // Crear la carpeta si no existe
        if (!fs.existsSync(activityDir)) {
            fs.mkdirSync(activityDir, {recursive: true});
        }

        // Establecer la carpeta de destino
        cb(null, activityDir);
    },
    // Establecer el nombre del archivo de imagen subido (con nombre único)
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});

// Configurar el filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Aceptar si es imagen
    } else {
        cb(new Error('Solo se permiten archivos de imagen'), false);
    }
};

// Crear el middleware de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}, // Limitar el tamaño del archivo a 5MB
});

// Middleware para subir múltiples imágenes (array de imágenes)
export default upload.array('images', 10); // 'images' es el nombre del campo en el formulario, 10 es el límite de imágenes
