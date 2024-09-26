import pool from '../config/database.js';

class habitacionModel {
    static async createHabitacion(habitacionData) {
        try {
            const {codigo, tipo, costo, idhotel} = habitacionData;

            const [result] = await pool.query(
                'INSERT INTO habitaciones (codigo, tipo, costo, idhotel) VALUES (?, ?, ?, ?)',
                [codigo, tipo, costo, idhotel],
            );
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async updateHabitacion(id, habitacionData) {
        try {
            const {codigo, tipo, costo} = habitacionData;

            const [result] = await pool.query(
                'UPDATE habitaciones SET codigo = ?, tipo = ?, costo = ? WHERE id = ?',
                [codigo, tipo, costo, id],
            );
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    // Modificado para hacer una JOIN y obtener el nombre del hotel
    static async getAllHabitaciones() {
        try {
            const [rows] = await pool.query(`
                SELECT h.codigo, h.tipo, h.costo, h.idhotel, ho.nombre AS hotelNombre
                FROM habitaciones h
                JOIN hoteles ho ON h.idhotel = ho.id
            `);
            return rows; // Devuelve el array de habitaciones con el nombre del hotel
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getHabitacionesByHotel(hotelId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM habitaciones WHERE idhotel = ?',
                [hotelId],
            );
            return rows;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getHabitacionById(id) {
        try {
            const query = 'SELECT * FROM habitaciones WHERE id = ?'; // Asegúrate de que el nombre de la tabla sea correcto
            const [rows] = await db.execute(query, [id]); // Ejecuta la consulta con el ID proporcionado

            if (rows.length === 0) {
                return null; // Si no se encuentra ninguna habitación, devuelve null
            }

            return rows[0]; // Devuelve la primera habitación encontrada
        } catch (error) {
            console.error('Error al obtener la habitación por ID:', error);
            throw error; // Lanza el error para manejarlo en el controlador
        }
    }

    static async deleteHabitacion(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM habitaciones WHERE id = ?',
                [id],
            );
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default habitacionModel;
