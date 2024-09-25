import pool from '../config/database.js';

class ActivityModel {
    // Método para obtener todas las actividades
    static async getAllActivities() {
        try {
            // variables con la consulta SQL
            const query = 'SELECT * FROM actividades';

            // Ejecutar la consulta SQL
            const [rows] = await pool.query(query);
            return rows; // Retorna todas las filas de la tabla
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
    // Método para obtener todas las actividades con sus imágenes
    static async getAllImages() {
        try {
            // variables con la consulta SQL
            const query = `SELECT a.id, a.nombre, a.costo, a.descripcion, a.disponibilidad, a.ubicacion, i.urlImg
                            FROM actividades a
                            LEFT JOIN imagenesActividades i ON a.id = i.idActividad
                            WHERE i.id = (
                                SELECT MIN(i2.id) 
                                FROM imagenesActividades i2 
                                WHERE i2.idActividad = a.id
                            );`;

            // Ejecutar la consulta SQL
            const [rows] = await pool.query(query);
            return rows; // Retorna todas las filas de la tabla
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
    // Método para obtener imágenes relacionadas a una actividad
    static async getImagesByActivityId(activityId) {
        try {
            const query =
                'SELECT urlImg FROM imagenesActividades WHERE idActividad = ?';
            const [rows] = await pool.query(query, [activityId]);
            return rows; // Retorna las URLs de las imágenes
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
            throw error;
        }
    }
    // Método para contar el número total de actividades
    static async countActivities() {
        try {
            // variables con la consulta SQL
            const query = 'SELECT COUNT(*) as count FROM actividades';

            // Ejecutar la consulta SQL
            const [rows] = await pool.query(query);
            return rows[0].count; // Retorna el número total de actividades
        } catch (error) {
            console.error('Error counting items:', error);
            throw error;
        }
    }
    // Método para obtener actividades con limite y desplazamiento (paginación)
    static async getActivityPage(limit, offset) {
        try {
            console.log('limit:', limit, 'offset:', offset);

            // variables con la consulta SQL
            const query = 'SELECT * FROM actividades LIMIT ? OFFSET ?';
            const values = [limit, offset];

            // Ejecutar la consulta SQL
            const [rows] = await pool.query(query, values);
            return rows; // Retorna todas las filas de la tabla
        } catch (error) {
            console.error('Error fetching items:', error);
            throw error;
        }
    }
    // Metodo para obtener una actividad por ID
    static async getActivityId(id) {
        try {
            const query = 'SELECT * FROM actividades WHERE id = ?';
            const values = [id];
            const [rows] = await pool.query(query, values);
            return rows;
        } catch (error) {
            console.error(`Error fetching item with ID ${id}:`, error);
            throw error;
        }
    }
    // Método para crear una nueva actividad
    static async createActivity({
        nombre,
        costo,
        descripcion,
        disponibilidad,
        ubicacion,
    }) {
        try {
            const query = `
            INSERT INTO actividades (nombre, costo, descripcion, disponibilidad, ubicacion)
            VALUES (?, ?, ?, ?, ?)`;
            // Convertir la descripción en JSON
            const descripcionJson = JSON.stringify(descripcion);
            const values = [
                nombre,
                costo,
                descripcionJson,
                disponibilidad,
                ubicacion,
            ];
            const [result] = await pool.query(query, values);
            return result;
        } catch (error) {
            console.error('Error creating new item:', error);
            throw error;
        }
    }
    // Método para actualizar una actividad
    static async updateActivity(id, activityData) {
        try {
            const {nombre, costo, descripcion, disponibilidad, ubicacion} =
                activityData;

            // Verificar si el campo `descripcion` ya es un objeto o si necesita ser convertido en JSON
            let descripcionJson;
            if (typeof descripcion === 'object') {
                descripcionJson = JSON.stringify(descripcion); // Serializar a JSON si es un objeto
            } else {
                descripcionJson = descripcion; // Mantener como está si ya es un string JSON
            }

            console.log('activityData:', activityData);
            console.log('Descripción JSON:', descripcionJson);

            // Consulta SQL para actualizar la actividad
            const query = `UPDATE actividades SET nombre = ?, costo = ?, descripcion = ?, disponibilidad = ?, ubicacion = ? WHERE id = ?`;
            const values = [
                nombre,
                costo,
                descripcionJson,
                disponibilidad,
                ubicacion,
                id,
            ];

            // Ejecutar la consulta SQL
            const [result] = await pool.query(query, values);

            return result;
        } catch (error) {
            console.error(`Error updating item with ID ${id}:`, error);
            throw error;
        }
    }

    // Método para cargar múltiples imágenes de una actividad
    static async uploadImages(activityData) {
        try {
            const {id, imgs} = activityData;

            // Crear un array de promesas para insertar cada imagen en la tabla 'imagenesActividades'
            const promises = imgs.map(async (img) => {
                return await pool.query(
                    'INSERT INTO imagenesActividades (urlImg, idActividad) VALUES (?, ?)',
                    [img, id],
                );
            });

            // Ejecutar todas las inserciones de imágenes en paralelo
            const results = await Promise.all(promises);

            return results;
        } catch (error) {
            throw new Error(error);
        }
    }
    // Método para eliminar una actividad por ID
    static async deleteActivity(id) {
        try {
            const query = 'DELETE FROM actividades WHERE id = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(`Error eliminando actividad con ID ${id}:`, error);
            throw error;
        }
    }
    // Método para eliminar una actividad y sus imágenes en la base de datos
    static async deleteImagesByActivityId(activityId) {
        try {
            const query =
                'DELETE FROM imagenesActividades WHERE idActividad = ?';
            const [result] = await pool.query(query, [activityId]);
            return result;
        } catch (error) {
            console.error(
                `Error eliminando imágenes para la actividad con ID ${activityId}:`,
                error,
            );
            throw error;
        }
    }
}

export default ActivityModel;
