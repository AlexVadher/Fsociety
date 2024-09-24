import pool from '../config/database.js';

class hotelModel {
    // Método para registrar un hotel
    static async createHotel(hotelData) {
        try {
            const {
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad,
                descripcion,
            } = hotelData;

            const [result] = await pool.query(
                'INSERT INTO hoteles (nombre, telefono, ubicacion, estrellas, disponibilidad, descripcion) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    nombre,
                    telefono,
                    ubicacion,
                    estrellas,
                    disponibilidad,
                    descripcion,
                ],
            );
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    // Método para cargar múltiples imágenes de un hotel
    static async uploadImages(hotelData) {
        try {
            const {id, imgs} = hotelData;

            // Crear un array de promesas para insertar cada imagen en la tabla 'imagenesHoteles'
            const promises = imgs.map(async (img) => {
                return await pool.query(
                    'INSERT INTO imagenesHoteles (urlImg, idHotel) VALUES (?, ?)',
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
    // Método para actualizar la información de un hotel
    static async updateHotel(id, hotelData) {
        try {
            // Desestructuración de los datos del hotel
            const {
                nombre,
                telefono,
                ubicacion,
                estrellas,
                disponibilidad,
                descripcion,
            } = hotelData;

            // Actualizando la información del hotel en la base de datos
            const [result] = await pool.query(
                'UPDATE hoteles SET nombre = ?, telefono = ?, ubicacion = ?, estrellas = ?, disponibilidad = ?, descripcion = ? WHERE id = ?', // Cambiar `idHotel` a `id`
                // estos son los valores que se van a actualizar en la base de datos (es un array)
                [
                    nombre,
                    telefono,
                    ubicacion,
                    estrellas,
                    disponibilidad,
                    descripcion,
                    id, // Cambiar `hotelId` a `id` para que coincida con la desestructuración
                ],
            );
            return result; // Devuelve el resultado de la actualización del hotel en la base de datos
        } catch (error) {
            throw new Error(error);
        }
    }
    // Método para obtener todos los hoteles
    static async getAllHotels() {
        try {
            // variables con la consulta SQL
            const query = 'SELECT * FROM hoteles';

            // Ejecutar la consulta SQL
            const [rows] = await pool.query(query);
            return rows; // Retorna todas las filas de la tabla
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
    // Método para obtener un hotel por su ID
    static async getHotelById(hotelId) {
        try {
            const [rows] = await pool.query(
                'SELECT id, nombre, telefono, ubicacion, estrellas, disponibilidad, descripcion FROM hoteles WHERE id = ?',
                [hotelId],
            );
            return rows[0]; // Devuelve el primer hotel encontrado con el ID proporcionado
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAllImages() {
        try {
            // variables con la consulta SQL
            const query = `SELECT a.id, a.nombre, a.telefono, a.ubicacion, a.estrellas, a.descripcion, a.disponibilidad, i.urlImg
                            FROM hoteles a
                            LEFT JOIN imagenesHoteles i ON a.id = i.idHotel
                            WHERE i.id = (
                                SELECT MIN(i2.id) 
                                FROM imagenesHoteles i2 
                                WHERE i2.idHotel = a.id
                            );`;

            // Ejecutar la consulta SQL
            const [rows] = await pool.query(query);
            return rows; // Retorna todas las filas de la tabla
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }
    static async getImagesByHotelId(hotelId) {
        try {
            const query =
                'SELECT urlImg FROM imagenesHoteles WHERE idHotel = ?';
            const [rows] = await pool.query(query, [hotelId]);
            return rows; // Retorna las URLs de las imágenes
        } catch (error) {
            console.error('Error al obtener las imágenes:', error);
            throw error;
        }
    }

    static async getHabitacioneslById(hotelId) {
        try {
            const [rows] = await pool.query(
                'SELECT id, codigo, tipo, costo FROM habitaciones WHERE idHotel = ?',
                [hotelId],
            );
            return rows[0]; // Devuelve el primer hotel encontrado con el ID proporcionado
        } catch (error) {
            throw new Error(error);
        }
    }

    static async deleteHotel(id) {
        try {
            const query = 'DELETE FROM hoteles WHERE id = ?';
            const [result] = await pool.query(query, [id]);
            return result;
        } catch (error) {
            console.error(`Error eliminando hotel con ID ${id}:`, error);
            throw error;
        }
    }
    // Método para eliminar un hotel y sus imágenes en la base de datos
    static async deleteImagesByHotelId(hotelId) {
        try {
            const query = 'DELETE FROM imagenesHoteles WHERE idHotel = ?';
            const [result] = await pool.query(query, [hotelId]);
            return result;
        } catch (error) {
            console.error(
                `Error eliminando imágenes para los hoteles con ID ${hotelId}:`,
                error,
            );
            throw error;
        }
    }
    static async deleteHabitacionesByHotelId(hotelId) {
        try {
            const query = 'DELETE FROM habitaciones WHERE idHotel = ?';
            const [result] = await pool.query(query, [hotelId]);
            return result;
        } catch (error) {
            console.error(
                `Error eliminando habitaciones para los hoteles con ID ${hotelId}:`,
                error,
            );
            throw error;
        }
    }
}

export default hotelModel;
