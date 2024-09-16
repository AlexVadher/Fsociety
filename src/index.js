import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import {engine} from 'express-handlebars';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser'; // Importar cookie-parser
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'; // Rutas para los usuarios
import routerActivity from './routes/activitites.routes.js';
dotenv.config(); // Cargar variables de entorno

// Inicializar express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configurar cookie-parser
app.use(cookieParser());

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
            ifEquals: (arg1, arg2, options) =>
                arg1 === arg2 ? options.fn(this) : options.inverse(this), // pendiente por validar
        },
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
    // validar si existe la session del usuario
    if (req.session.user) {
        res.render('index', {user: req.session.user});
    } else {
        res.render('index');
    }
});

// Rutas de los usuarios
app.use(userRouter);

app.use(routerActivity);
// Iniciar el servidor
app.listen(app.get('port'), () =>
    console.log('Servidor en el puerto', app.get('port')),
);
