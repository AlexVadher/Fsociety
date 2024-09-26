import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser'; // Importar cookie-parser
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'; // Rutas para los usuarios
import routerActivity from './routes/activitites.routes.js';
import routerHotel from './routes/hotel.routes.js';
import routerHabitacion from './routes/habitacion.routes.js';
import apikey from './middlewares/apikey.js'; // Middleware para pasar la clave de API a todas las vistas
dotenv.config(); // Cargar variables de entorno

// Inicializar express
const app = express();
// Definir la ruta base de la aplicación para construir rutas relativas a ella en otros archivos de la aplicación
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-google-api-key',
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE',
    );
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Middleware para verificar la autenticación del usuario
app.use(
    session({
        secret: process.env.JWT_PRIVATE_KEY, // Cambia esto por una clave secreta segura
        resave: false, // No guardar la sesión si no se realiza ningún cambio
        saveUninitialized: false, // para guardar la sesión en el servidor y no en el cliente (cookie)
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Cambia a true si usas HTTPS
            maxAge: 3600000, // 1 hora en milisegundos
        },
    }),
);

// Configuración del puerto
app.set('port', process.env.PORT || 4000);
app.set('views', join(__dirname, 'views'));

// Configurar el motor de plantillas handlebars
app.engine(
    'hbs',
    engine({
        defaultLayout: 'main',
        layoutsDir: join(app.get('views'), 'layouts'),
        partialsDir: join(app.get('views'), 'partials'),
        extname: '.hbs',
        helpers: {
            eq: (a, b) => a === b,
            ifEquals: (arg1, arg2, options) =>
                arg1 === arg2 ? options.fn(this) : options.inverse(this),

            // Helper para comparar si un número es mayor
            gt: (a, b) => a > b,

            // Helper para comparar si un número es menor
            lt: (a, b) => a < b,

            // Helper para sumar dos números
            add: (a, b) => a + b,

            // Helper para restar dos números
            subtract: (a, b) => a - b,

            // Helper para generar un rango de números
            range: (start, end) => {
                const range = [];
                for (let i = start; i <= end; i++) {
                    range.push(i);
                }
                return range;
            },
        },
    }),
);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev')); // Mostrar las peticiones HTTP en consola para desarrollo
app.use(express.urlencoded({extended: true})); // Habilitamos el uso de formularios HTML en la API para poder recibir y enviar datos en este formato
app.use(cookieParser()); // Configurar cookie-parser
app.use(express.json()); // Habilitamos el uso de JSON en la API para poder recibir y enviar datos en este formato
app.use(cors()); //Habilitamos CORS para que la API pueda ser consumida desde cualquier origen o dominio sin restricciones

// Archivos estáticos (CSS, JS, imágenes)
// Mover esto antes de las rutas de la aplicación
app.use(express.static(join(__dirname, '..', 'public')));

// Middleware para pasar la clave de API a todas las vistas
app.use(apikey);

// Middleware para pasar la sesión a todas las vistas
app.use((req, res, next) => {
    // Pasar la sesión de usuario (si existe) a las vistas
    res.locals.user = req.session.user || null;
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Rutas de los usuarios
app.use(userRouter);
// Rutas de los hoteles
app.use(routerHotel);
// Rutas de las habitaciones
app.use(routerHabitacion);
// Rutas de las actividades
app.use(routerActivity);

// Iniciar el servidor
app.listen(app.get('port'), () =>
    console.log('Servidor en el puerto', app.get('port')),
);
