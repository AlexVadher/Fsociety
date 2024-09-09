import pool from '../config/database.js'; // Asegúrate de importar tu configuración de base de datos
import {v4 as uuidv4} from 'uuid';
import argon2 from 'argon2';

class userModel {
    // Método para crear un nuevo usuario en la base de datos con los datos proporcionados desde el controlador
    static async createUser(userData) {
        try {
            const {
                nombre,
                apellido,
                correo,
                contraseña,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
            } = userData;

            // Generar un GUID para el id del usuario
            const guid = uuidv4();

            // Generar un hash para la contraseña antes de almacenarla
            const hashedPassword = await argon2.hash(contraseña);

            // Insertando el nuevo usuario en la base de datos y devolviendo el resultado
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol, guid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    nombre,
                    apellido,
                    correo,
                    hashedPassword,
                    telefono,
                    genero,
                    orientacionSexual,
                    pais,
                    idRol,
                    guid,
                ],
            );
            return result; // Devuelve el resultado de la inserción del usuario en la base de datos para su posterior uso
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para actualizar la información de un usuario
    static async updateUser(userId, userData) {
        try {
            const {
                nombre,
                apellido,
                correo,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
            } = userData;

            // Actualizando la información del usuario en la base de datos
            const [result] = await pool.query(
                'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, telefono = ?, genero = ?, orientacionSexual = ?, pais = ?, idRol = ? WHERE idUsuario = ?',
                [
                    nombre,
                    apellido,
                    correo,
                    telefono,
                    genero,
                    orientacionSexual,
                    pais,
                    idRol,
                    userId,
                ],
            );
            return result; // Devuelve el resultado de la actualización del usuario en la base de datos
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para obtener un usuario por su ID
    static async getUserById(userId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM usuarios WHERE id = ?',
                [userId],
            );
            return rows[0]; // Devuelve el primer usuario encontrado con el ID proporcionado
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para obtener un usuario por su correo electrónico
    static async getUserByEmail(correo) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM usuarios WHERE correo = ?',
                [correo],
            );
            return rows[0]; // Devuelve el primer usuario encontrado con el correo electrónico proporcionado
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para eliminar un usuario por su guid
    static async getUserByGuid(guid) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM usuarios WHERE guid = ?',
                [guid],
            );
            return rows[0]; // Devuelve el primer usuario encontrado con el GUID proporcionado
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default userModel;
