import pool from '../config/database.js';
import {v4 as uuidv4} from 'uuid';

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
    // Metodo para obtener una actividad por ID
    static async getItemById(id) {
        try {
            const query = 'SELECT * FROM actividades WHERE id = ';
            const values = [id];
            const {rows} = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`Error fetching item with ID ${id}:`, error);
            throw error;
        }
    }
    // Método para crear una nueva actividad
    static async createActivity({nombre, costo, descripcion, disponibilidad}) {
        try {
            const query = `
                INSERT INTO actividades (nombre, costo, descripcion, disponibilidad)
                VALUES (?, ?, ?, ?)`;
            const values = [nombre, costo, descripcion, disponibilidad];
            const [result] = await pool.query(query, values);
            return result;
        } catch (error) {
            console.error('Error creating new item:', error);
            throw error;
        }
    }
    // Metodo para actualizar una actividad
    static async updateActivity(id, activityData) {
        try {
            const {nombre, costo, descripcion, disponibilidad} = activityData;

            // Variables con la consulta SQL y los valores a actualizar
            const query = `UPDATE actividades SET nombre = ?, costo = ?, descripcion = ?, disponibilidad = ? WHERE id = ?`;
            const values = [nombre, costo, descripcion, disponibilidad, id];

            // Ejecutar la consulta SQL
            const result = await pool.query(query, values);
        } catch (error) {
            console.error(`Error updating item with ID ${id}:`, error);
            throw error;
        }
    }
    // Método para eliminar una actividad por ID
    static async deleteItem(id) {
        try {
            const query = 'DELETE FROM activities WHERE id = $1';
            const values = [id];
            const result = await pool.query(query, values);
            return result.rowCount > 0; // Retorna true si se eliminó alguna fila
        } catch (error) {
            console.error(`Error deleting item with ID ${id}:`, error);
            throw error;
        }
    }
}

export default ActivityModel;
