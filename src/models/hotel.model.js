import pool from '../config/database.js';

class hotelModel {
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

    static async updateUser(hotelId, hotelData) {
        try {
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
                'UPDATE hoteles SET nombre = ?, telefono = ?, ubicacion = ?, estrellas = ?, disponibilidad = ?, descripcion = ? WHERE idHotel = ?',
                [
                    nombre,
                    telefono,
                    ubicacion,
                    estrellas,
                    disponibilidad,
                    descripcion,
                    hotelId,
                ],
            );
            return result; // Devuelve el resultado de la actualización del hotel en la base de datos
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAllHotels() {
        try {
            const [rows] = await pool.query(`
              SELECT id,
                  nombre,
                  telefono,
                  ubicacion,
                  estrellas,
                  CASE 
                      WHEN disponibilidad = 1 THEN 'Disponible'
                      ELSE 'No Disponible'
                  END AS disponibilidad,
                  descripcion
              FROM hoteles
          `);
            return rows; // Devuelve el array de hoteles con la disponibilidad convertida
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getHotelById(hotelId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM hoteles WHERE id = ?',
                [hotelId],
            );
            return rows[0]; // Devuelve el primer hotel encontrado con el ID proporcionado
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default hotelModel;
