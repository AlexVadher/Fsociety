import ActivityModel from '../models/activities.model.js';

class activitiesController {
    // Método para crear una actividad (Post)
    static async createActivity(req, res) {
        try {
            // Obtener los datos del formulario de registro de actividad desde req.body
            const {
                nombre,
                costo,
                incluido,
                noIncluido,
                descripcionDetallada,
                detallesPrincipales,
                requisitos,
                disponibilidad,
                ubicacion,
            } = req.body;

            // Validar que todos los campos requeridos estén presentes
            if (
                !nombre ||
                !costo ||
                !incluido ||
                !noIncluido ||
                !descripcionDetallada ||
                !detallesPrincipales ||
                !requisitos ||
                !ubicacion ||
                disponibilidad === undefined
            ) {
                return res
                    .status(400)
                    .json({message: 'Todos los campos son obligatorios'});
            }

            // Verificar que el costo sea un número válido
            if (isNaN(costo)) {
                return res
                    .status(400)
                    .json({message: 'El costo debe ser un número válido'});
            }

            // Verificar que disponibilidad sea un valor booleano
            const isDisponibilidadValid =
                disponibilidad === 'true' || disponibilidad === 'false';
            if (!isDisponibilidadValid) {
                return res.status(400).json({
                    message: 'La disponibilidad debe ser un valor booleano',
                });
            }

            // Convertir disponibilidad a booleano
            const disponibilidadBoolean = disponibilidad === 'true';

            // Construir el objeto `descripcion` con los campos individuales
            const descripcion = {
                descripcionDetallada,
                detallesPrincipales,
                incluido,
                noIncluido,
                requisitos,
            };

            // Llamar al método createActivity del modelo
            const result = await ActivityModel.createActivity({
                nombre,
                costo,
                descripcion, // Enviamos el objeto `descripcion` al modelo
                disponibilidad: disponibilidadBoolean,
                ubicacion,
            });

            console.log('Resultado de la creación de la actividad:', result);

            // Redireccionar a la lista de actividades
            res.redirect('/admin/ListActivities');
        } catch (err) {
            console.error('Error al registrar la actividad:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
        }
    }
    // Método para ver detalles de la actividad antes de  Reservar (Get)
    static async detailActivity(req, res) {
        try {
            // Obtener el ID de la actividad de los parámetros de la URL
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID de la actividad es obligatorio',
                });
            }

            // Llamar al método getActivityById de la clase ActivityModel
            const activity = await ActivityModel.getActivityId(id);

            // Verificar si se encontró la actividad
            if (!activity) {
                return res.status(404).json({
                    message: 'Actividad no encontrada',
                });
            }

            // Responder con la actividad
            res.render('activities/reserveActivity', {
                activity,
            });

            console.log('Actividad encontrada:', activity);
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer la actividad:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Método para reservar una actividad (Post)
    static async reserveActivity(req, res) {
        try {
            // Obtener los datos del formulario de reserva de actividad desde req.body
            const {id} = req.params; // Obtener el ID de la actividad de los parámetros de la URL
            const {nombre, apellidos, telefono, email} = req.body;

            console.log('Datos recibidos:', req.body); // Registro de datos recibidos

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID de la actividad es obligatorio',
                });
            }

            // Validar que todos los campos requeridos estén presentes
            if (!nombre || !apellidos || !telefono || !email) {
                return res.status(400).json({
                    message: 'Todos los campos son obligatorios',
                });
            }

            // Verificar que el número de personas sea un número válido
            if (isNaN(personas)) {
                return res.status(400).json({
                    message: 'El número de personas debe ser un número válido',
                });
            }

            // Verificar que el teléfono sea un número válido
            if (isNaN(telefono)) {
                return res.status(400).json({
                    message: 'El teléfono debe ser un número válido',
                });
            }

            // crear objeto con los datos de la reserva
            const reserveData = {
                nombre,
                fecha,
                idUsuario: req.session.id,
                estado,
                costoTotal,
            };
            // Llamar al método reserveActivity del modelo
            const reserve = await ActivityModel.reserveActivity(id, {
                reserveData,
            });

            console.log('Resultado de la reserva de la actividad:', result);

            // Crear objeto con los datos del cliente
            const informacionCliente = {
                nombre,
                apellidos,
                telefono,
                email,
            };
            // crear objeto para descripción de la reserva ya que es un JSON
            const descripcion = JSON.stringify({
                numeroReserva: reserve.insertId,
                fechaEmision: new Date().toISOString(), // Fecha actual en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
                montoTotal: costoTotal,
                nombreActividad: nombre,
                fechaReserva: fecha,
                ubicacionActividad: ubicacion,
                personas,
                informacionCliente,
            });

            // crear objeto con los datos del detalle de la reserva
            const detailesReserveData = {
                idReserva: reserve.insertId,
                idActividad: id,
                descripcion,
                comprobante,
            };

            // llamar al método detatailsReserveActivity del modelo
            const detailReserve = await ActivityModel.detailsReserveActivity({
                detailesReserveData,
            });

            console.log(
                'Resultado de la reserva de la actividad:',
                detailReserve,
            );

            // Redirigir a la página de inicio después de la reserva exitosa
            res.redirect('/admin/ListActivities');
        } catch (err) {
            // Manejo de errores
            console.error('Error al reservar la actividad:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
        }
    }
    // Método para obtener una actividad por ID (Get)
    static async listActivityById(req, res) {
        try {
            // Obtener el ID de la actividad de los parámetros de la URL
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID de la actividad es obligatorio',
                });
            }

            // Llamar al método getActivityById de la clase ActivityModel
            const activity = await ActivityModel.getActivityId(id);

            // Verificar si se encontró la actividad
            if (!activity) {
                return res.status(404).json({
                    message: 'Actividad no encontrada',
                });
            }

            // Extraer la actividad (asumiendo que es el primer objeto en el array)
            const activityDetails = activity[0];

            // Asegurarse de que 'descripcion' sea un objeto JSON válido
            if (typeof activityDetails.descripcion === 'string') {
                // Si es un string, intentar convertirlo en un objeto JSON
                try {
                    activityDetails.descripcion = JSON.parse(
                        activityDetails.descripcion,
                    );
                } catch (error) {
                    console.error('Error al parsear la descripción:', error);
                    activityDetails.descripcion = {
                        descripcionDetallada: '',
                        detallesPrincipales: [],
                        incluido: [],
                        noIncluido: [],
                        requisitos: [],
                    };
                }
            }

            // Convertir 'incluido', 'noIncluido' y 'requisitos' en arrays
            activityDetails.descripcion.incluido =
                activityDetails.descripcion.incluido
                    .split(', ')
                    .filter(Boolean);
            activityDetails.descripcion.noIncluido =
                activityDetails.descripcion.noIncluido
                    .split(', ')
                    .filter(Boolean);
            activityDetails.descripcion.detallesPrincipales =
                activityDetails.descripcion.detallesPrincipales
                    .split(', ')
                    .filter(Boolean);
            activityDetails.descripcion.requisitos =
                activityDetails.descripcion.requisitos
                    .split(', ')
                    .filter(Boolean);

            // Llamar al método getImagesByActivityId de la clase ActivityModel para obtener las imágenes
            const images = await ActivityModel.getImagesByActivityId(id);

            // Responder con la actividad y sus imágenes
            res.render('activities/detailActivity', {
                activity: activityDetails, // Asegurarse de que se pase solo el primer objeto
                images,
            });

            console.log('Actividad y sus imágenes:', {
                activity: activityDetails,
                images,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer la actividad:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Método para listar todas las actividades (Get)
    static async listActivity(req, res) {
        try {
            // Llamar al método getAllActivities de la clase ActivityModel para obtener las actividades
            const activities = await ActivityModel.getAllActivities();

            // Verificar si se encontraron actividades
            /* if (!activities || activities.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron actividades',
                });
            } */

            console.log('Actividades encontradas:', activities); // Registro de las actividades encontradas

            // Devolver la lista de actividades
            /* res.status(200).json({
                message: 'Actividades recuperadas exitosamente',
                body: activities,
            }); */

            // Obtener el número total de actividades
            const totalActivities = await ActivityModel.countActivities();

            // Definir el número de actividades por página
            const itemsPerPage = 2;

            // Calcular el número total de páginas
            const totalPages = Math.ceil(totalActivities / itemsPerPage);

            // Obtener el número de página actual
            const currentPage = parseInt(req.query.page) || 1;

            // Calcular el desplazamiento
            const offset = (currentPage - 1) * itemsPerPage;

            // Llamar al método getActivityPage de la clase ActivityModel
            const activitiespage = await ActivityModel.getActivityPage(
                itemsPerPage,
                offset,
            );

            console.log('Actividades encontradas:', activitiespage); // Registro de las actividades encontradas

            // Verificar si se encontraron actividades
            /* if (!activitiespage || activitiespage.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron actividades',
                });
            } */

            const currentPath = req.path;

            const menuItems = [
                {
                    name: 'Dashboard',
                    link: `/admin/dashboard`,
                    icon: 'fas fa-chart-bar',
                    active: currentPath.includes('/admin/Dashboard'),
                },
                {
                    name: 'Usuarios',
                    link: `#`,
                    icon: 'fas fa-users',
                    active: currentPath.includes('/admin/usuarios'),
                },
                {
                    name: 'Hoteles',
                    link: `/admin/hotels`,
                    icon: 'fas fa-hotel',
                    active: currentPath.includes('/admin/hotels'),
                },
                {
                    name: 'Actividades',
                    link: `/admin/ListActivities`,
                    icon: 'fas fa-calendar-alt',
                    active: currentPath.includes('/admin/listActivities'),
                },
                {
                    name: 'Reservas',
                    link: `#`,
                    icon: 'fas fa-book',
                    active: currentPath.includes('/admin/reservas'),
                },
                {
                    name: 'Configuración',
                    link: `/profile/settings/:guid`,
                    icon: 'fas fa-cogs',
                    active: currentPath.includes('/profile/settings/:guid'),
                },
                // Puedes añadir más elementos según sea necesario
            ];

            // Activar dinámicamente el enlace actual
            menuItems.forEach((item) => {
                if (item.link === currentPath) {
                    item.active = true;
                }
            });

            res.render('activities/listActivities', {
                activities,
                activitiespage,
                totalPages,
                currentPage,
                layout: 'admin',
                title: 'Actividades',
                currentPath,
                menuItems: menuItems,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer las actividades:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Método para listar todas las actividades y sus imágenes (Get)
    static async listActivityImages(req, res) {
        try {
            // Llamar al método getAllImages de la clase ActivityModel para obtener las imágenes
            const images = await ActivityModel.getAllImages();

            // Verificar si se encontraron imágenes
            if (!images || images.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron imágenes',
                });
            }

            console.log('Imágenes encontradas:', images); // Registro de las imágenes encontradas

            // Organizar las imágenes por actividad
            const imagesByActivity = images.reduce((acc, item) => {
                const {
                    id,
                    nombre,
                    costo,
                    descripcion,
                    disponibilidad,
                    ubicacion,
                    urlImg,
                } = item;

                if (!acc[id]) {
                    acc[id] = {
                        id,
                        nombre,
                        costo,
                        descripcion,
                        disponibilidad,
                        ubicacion,
                        imagen: urlImg, // Asignar la primera imagen
                    };
                }

                return acc;
            }, {});

            // Convertir el objeto en un array
            const activities = Object.values(imagesByActivity);

            // Renderizar la vista de actividades con imágenes
            res.render('activities/homeActivities', {
                activities,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer las actividades:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Método para renderizar la paginación de actividades
    static async listActivityPage(req, res) {
        try {
            // Obtener el número total de actividades
            const totalActivities = await ActivityModel.countActivities();

            // Definir el número de actividades por página
            const itemsPerPage = 5;

            // Calcular el número total de páginas
            const totalPages = Math.ceil(totalActivities / itemsPerPage);

            // Obtener el número de página actual
            const currentPage = parseInt(req.query.page) || 1;

            // Calcular el desplazamiento
            const offset = (currentPage - 1) * itemsPerPage;

            // Llamar al método getActivityPage de la clase ActivityModel
            const activities = await ActivityModel.getActivityPage(
                itemsPerPage,
                offset,
            );

            // Verificar si se encontraron actividades
            if (!activities || activities.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron actividades',
                });
            }

            console.log('Sctividades encontradas:', activities); // Registro de las actividades encontradas
            console.log(activities, totalPages, currentPage);
            // Renderizar la vista de actividades con paginación
            res.render('activities/activity', {
                activities,
                totalPages,
                currentPage,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer las actividades:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Método para actualizar una actividad por ID (Update)
    static async updateActivity(req, res) {
        try {
            // Obtener los datos del formulario de actualización desde req.body
            const {id} = req.params; // Obtener el ID de la actividad de los parámetros de la URL
            const {
                nombre,
                costo,
                incluido,
                noIncluido,
                requisitos,
                descripcionDetallada,
                detallesPrincipales,
                disponibilidad,
                ubicacion,
            } = req.body;

            // Validar que el ID esté presente
            if (!id) {
                return res
                    .status(400)
                    .json({message: 'El ID de la actividad es obligatorio'});
            }

            // Validar que todos los campos requeridos estén presentes
            if (
                !nombre ||
                !costo ||
                !incluido ||
                !noIncluido ||
                !requisitos ||
                !descripcionDetallada ||
                !detallesPrincipales ||
                !ubicacion ||
                disponibilidad === undefined
            ) {
                return res
                    .status(400)
                    .json({message: 'Todos los campos son obligatorios'});
            }

            console.log('Datos recibidos:', req.body); // Registro de datos recibidos

            // Verificar que el costo sea un número válido
            if (isNaN(costo)) {
                return res
                    .status(400)
                    .json({message: 'El costo debe ser un número válido'});
            }

            // Verificar que disponibilidad sea un valor booleano
            const isDisponibilidadValid =
                disponibilidad === '1' || disponibilidad === '0';
            if (!isDisponibilidadValid) {
                return res.status(400).json({
                    message:
                        'La disponibilidad debe ser un valor booleano (1 o 0)',
                });
            }
            console.log('disponibilidad:', disponibilidad);

            // Convertir disponibilidad a booleano
            const disponibilidadBoolean = disponibilidad === '1';

            // Serializar el objeto `descripcion` a JSON
            const descripcionJSON = JSON.stringify({
                incluido,
                noIncluido,
                requisitos,
                detallesPrincipales,
                descripcionDetallada,
            });

            console.log('Datos para actualizar:', {
                nombre,
                costo,
                descripcion: descripcionJSON,
                disponibilidad: disponibilidadBoolean,
            });

            // Crear objeto con los datos actualizados
            const activityData = {
                nombre,
                costo,
                descripcion: descripcionJSON, // Asegurarse de pasar la descripción como JSON
                disponibilidad: disponibilidadBoolean,
                ubicacion,
            };

            // Llamar al método updateActivity de la clase ActivityModel
            const result = await ActivityModel.updateActivity(id, activityData);

            console.log(
                'Resultado de la actualización de la actividad:',
                result,
            );

            // Redirigir a la lista de actividades después de la actualización exitosa
            res.redirect('/admin/ListActivities');
        } catch (err) {
            // Manejo de errores
            console.error('Error al actualizar la actividad:', err);
            res.status(500).json({message: 'Error 500: ' + err.message});
        }
    }
    // Método para subir imágenes de una actividad específica (Post)
    static async uploadImages(req, res) {
        try {
            const {id} = req.params; // Obtener el ID de la actividad de los parámetros de la URL

            // Validar que el ID esté presente
            if (!id) {
                return res
                    .status(400)
                    .json({message: 'El ID de la actividad es obligatorio'});
            }

            // Validar si se han subido archivos de imagen en la solicitud
            if (!req.files || req.files.length === 0) {
                return res
                    .status(400)
                    .json({message: 'No se han subido archivos'});
            }

            // Obtener las URLs de las imágenes subidas
            const imgs = req.files.map(
                (file) => `/uploads/activities/${id}/${file.filename}`,
            );

            console.log('Datos recibidos:', req.files); // Registro de datos

            // Llamar al método uploadImages de la clase ActivityModel
            const result = await ActivityModel.uploadImages({id, imgs});

            console.log('Resultado de la subida de las imágenes:', result); // Registro de resultado

            // Redirigir a la página de actividades con el mensaje de éxito
            /* res.status(200).json({
                message: 'Imágenes subidas exitosamente',
                body: result,
            }); */

            res.redirect('/admin/ListActivities');
        } catch (err) {
            console.error('Error al subir las imágenes:', err);
            res.status(500).json({
                message: 'Error 500:' + err.message,
                body: req.body,
            });
        }
    }
    // Método para eliminar una actividad por ID
    static async deleteActivity(req, res) {
        try {
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res.status(400).json({
                    message: 'El ID de la actividad es obligatorio',
                });
            }

            // 1. Obtener las imágenes relacionadas a la actividad
            const images = await ActivityModel.getImagesByActivityId(id);

            // 2. Eliminar las imágenes de la base de datos si existen
            if (images && images.length > 0) {
                await ActivityModel.deleteImagesByActivityId(id);
            }

            // 3. Eliminar la actividad de la base de datos
            const result = await ActivityModel.deleteActivity(id);

            // Verificar si la actividad fue eliminada
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Actividad no encontrada o no eliminada',
                });
            }

            res.status(200).json({
                success: true,
                message: 'Actividad y sus imágenes eliminadas exitosamente',
                body: result,
            });
        } catch (err) {
            console.error('Error al eliminar la actividad:', err);
            res.status(500).json({
                success: false,
                message: 'Error 500: ' + err.message,
            });
        }
    }
}

// Exportamos la instancia del controlador con el enrutador
export default activitiesController;
