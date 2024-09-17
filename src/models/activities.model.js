import pool from '../config/database.js';  
import { v4 as uuidv4 } from 'uuid';

class ActivityModel {
    // Obtener todos los elementos desde la base de datos
    static async getAllActivities() {
        try {
            const query = 'SELECT * FROM actividades';
            const [result ] = await pool.query(query);
            return result;
        } catch (error) {
            console.error('Error fetching all items:', error);
            throw error;
        }
    }

    // Obtener un elemento por ID desde la base de datos
    static async getItemById(id) {
        try {
            const query = 'SELECT * FROM actividades WHERE id = ?';
            const values = id;
            const [result] = await pool.query(query, values);
            return result [0];
        } catch (error) {
            console.error(`Error fetching item with ID ${id}:`, error);
            throw error;
        }
    }

    // Crear un nuevo elemento en la base de datos
    static async createActivity({ nombre, costo, descripcion, disponibilidad }) {
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

    // Actualizar un elemento existente en la base de datos
    static async updateActivity( { id, activityData}) {
        try {
            const query = `
                UPDATE activities
                SET nombre = ?, costo = ?, descripcion = ?, disponibilidad = ?
                WHERE id = ?
            `;
            const values = [nombre, costo, descripcion, disponibilidad, id];
            const [rows] = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error(`Error updating item with ID ${id}:`, error);
            throw error;
        }
    }

    // Eliminar un elemento de la base de datos
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
