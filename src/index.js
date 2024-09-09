import express from 'express';
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser'; // Importar cookie-parser
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'; // Rutas para los usuarios
import authMiddleware from './middlewares/authToken.middleware.js'; // Middleware de autenticación

dotenv.config(); // Cargar variables de entorno

// Inicializar express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración del puerto
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));

// Configurar el motor de plantillas handlebars
app.engine(
    'hbs',
    engine({
        defaultLayout: 'main',
        layoutsDir: join(app.get('views'), 'layouts'),
        partialsDir: join(app.get('views'), 'partials'),
        extname: '.hbs',
    }),
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser()); // Configurar cookie-parser

// Archivos estáticos (CSS, JS, imágenes)
// Mover esto antes de las rutas de la aplicación
app.use(express.static(join(__dirname, '..', 'public')));

// Middleware para pasar la clave de API a todas las vistas
app.use((req, res, next) => {
    res.locals.API_KEY = process.env.API_KEY_GOOGLE_MAPS; // Clave de API de Google Maps
    next();
});

// Rutas de la aplicación
app.get('/', (req, res) => {
    res.render('index');
});

// Rutas de los usuarios
app.use(userRouter);

// Iniciar el servidor
app.listen(app.get('port'), () =>
    console.log('Servidor en el puerto', app.get('port')),
);
