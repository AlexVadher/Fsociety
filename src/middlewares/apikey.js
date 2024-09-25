const apikey = async (req, res, next) => {
    // importar apikey de las variables de entorno
    const apikey = process.env.API_KEY_GOOGLE_MAPS;

    // hacer la clave de API accesible en todas las vistas sin inportar la carpeta de las vistas
    res.locals.API_KEY = apikey;
    next();
};

export default apikey;
