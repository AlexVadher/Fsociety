import express from 'express';
import ActivityModel from '../models/activities.model.js';

class activitiesController {
    // Método para crear una actividad (Post)
    static async createActivity(req, res) {
        try {
            // Obtener los datos del formulario de registro de actividad desde req.body y validarlos
            const {nombre, costo, descripcion, disponibilidad} = req.body;

            if (
                !nombre ||
                !costo ||
                !descripcion ||
                disponibilidad === undefined
            ) {
                return res
                    .status(400)
                    .json({message: 'Todos los campos son obligatorios'});
            }

            // Verificar que los datos numéricos sean válidos
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

            console.log('Datos recibidos:', req.body); // Registro de datos

            // Llamar al método createActivity de la clase ActivityModel
            const result = await ActivityModel.createActivity({
                nombre,
                costo,
                descripcion,
                disponibilidad: disponibilidadBoolean,
            });

            console.log('Resultado de la creación de la actividad:', result); // Registro de resultado

            /*res.status(201).json({
                message: 'Actividad registrada exitosamente',
                body: result,
            });*/
            res.render('activities/activity');
        } catch (err) {
            console.error('Error al registrar la actividad:', err); // Mejorar el registro de errores
            res.status(500).json({
                message: 'Error 500: ' + err.message,
                body: req.body,
            });
        }
    }
    // Método para listar todas las actividades (Get)
    static async listActivity(req, res) {
        try {
            // Llamar al método getAllActivities de la clase ActivityModel para obtener las actividades
            const activities = await ActivityModel.getAllActivities();

            // Verificar si se encontraron actividades
            if (!activities || activities.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron actividades',
                });
            }

            console.log('Actividades encontradas:', activities); // Registro de las actividades encontradas

            // Devolver la lista de actividades
            /* res.status(200).json({
                message: 'Actividades recuperadas exitosamente',
                body: activities,
            }); */
            res.render('activities/activity', {activities});
        } catch (err) {
            // Manejo de errores
            console.error('Error al leer las actividades:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Métoodo para obtener una actividad por ID (Get)
    static async updateActivity(req, res) {
        try {
            // Obtener los datos del formulario de actualización desde req.body
            const {id} = req.params; // Obtener el ID de la actividad de los parámetros de la URL
            const {nombre, costo, descripcion, disponibilidad} = req.body;

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
                !descripcion ||
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
            console.log('disponibilidad:', disponibilidad);

            // Convertir disponibilidad a booleano
            const disponibilidadBoolean = disponibilidad === 'true';

            console.log('Datos para actualizar:', req.body); // Registro de datos recibidos

            // crear objeto con los datos actualizados
            const activityData = {
                nombre,
                costo,
                descripcion,
                disponibilidad: disponibilidadBoolean,
            };

            // Llamar al método updateActivity de la clase ActivityModel
            const result = await ActivityModel.updateActivity({
                id,
                activityData,
            });

            // Verificar si la actividad fue encontrada y actualizada
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Actividad no encontrada o no actualizada',
                });
            }

            console.log(
                'Resultado de la actualización de la actividad:',
                result,
            ); // Registro del resultado

            // Responder con éxito
            res.status(200).json({
                message: 'Actividad actualizada exitosamente',
                body: result,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al actualizar la actividad:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
    // Método para eliminar una actividad por ID (Delete)
    static async deleteActivity(req, res) {
        try {
            // Obtener el ID de la actividad de los parámetros de la URL
            const {id} = req.params;

            // Validar que el ID esté presente
            if (!id) {
                return res
                    .status(400)
                    .json({message: 'El ID de la actividad es obligatorio'});
            }

            console.log('ID de la actividad a eliminar:', id); // Registro del ID de la actividad a eliminar

            // Llamar al método deleteActivity de la clase ActivityModel
            const result = await ActivityModel.deleteActivity(id);

            // Verificar si la actividad fue encontrada y eliminada
            if (result.affectedRows === 0) {
                return res
                    .status(404)
                    .json({message: 'Actividad no encontrada o no eliminada'});
            }

            console.log('Resultado de la eliminación de la actividad:', result); // Registro del resultado

            // Responder con éxito
            res.status(200).json({
                message: 'Actividad eliminada exitosamente',
                body: result,
            });
        } catch (err) {
            // Manejo de errores
            console.error('Error al eliminar la actividad:', err);
            res.status(500).json({
                message: 'Error 500: ' + err.message,
            });
        }
    }
}

// Exportamos la instancia del controlador con el enrutador
export default activitiesController;
