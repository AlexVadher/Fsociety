import multer from 'multer';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from 'fs';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la carpeta si no existe
const uploadDir = join(__dirname, '..', '..', 'public', 'uploads', 'avatars');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}

// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});

// Configurar el filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // cb -> callback aceptar el archivo como verdadero si es una imagen y falso si es otro tipo de archivo
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

export default upload.single('avatar');
