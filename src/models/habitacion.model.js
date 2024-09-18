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

    static async updateHabitacion(habitacionId, habitacionData) {
        try {
            const {codigo, tipo, costo, idhotel} = habitacionData;

            const [result] = await pool.query(
                'UPDATE habitaciones SET codigo = ?, tipo = ?, costo = ?, idhotel = ? WHERE idHabitacion = ?',
                [codigo, tipo, costo, idhotel, habitacionId],
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
}

export default habitacionModel;
