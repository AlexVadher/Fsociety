import pool from '../config/database.js'; // Asegúrate de importar tu configuración de base de datos
import {v4 as uuidv4} from 'uuid';
import argon2 from 'argon2';

class userModel {
    // Método para crear un nuevo usuario en la base de datos con los datos proporcionados desde el controlador
    /* static async createUser(userData) {
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
                avatarUrl,
            } = userData;

            // Generar un GUID para el id del usuario
            const guid = uuidv4();

            // Generar un hash para la contraseña antes de almacenarla
            const hashedPassword = await argon2.hash(contraseña);

            // Insertando el nuevo usuario en la base de datos y devolviendo el resultado
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol, guid, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
                    avatarUrl,
                ],
            );
            return result; // Devuelve el resultado de la inserción del usuario en la base de datos para su posterior uso
        } catch (error) {
            throw new Error(error);
        }
    } */

    // Método para crear un nuevo usuario en la base de datos con los datos proporcionados desde el controlador
    static async createUser(userData) {
        try {
            const {
                nombre,
                apellido,
                correo,
                contrasena,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
                avatarUrl,
            } = userData;

            console.log(userData);

            // Verificar que todos los campos requeridos estén presentes
            if (
                !nombre ||
                !apellido ||
                !correo ||
                !contrasena ||
                !telefono ||
                !genero ||
                !orientacionSexual ||
                !pais ||
                !idRol ||
                !avatarUrl
            ) {
                throw new Error('Todos los campos son obligatorios');
            }

            // Registrar los datos para depuración
            console.log({
                nombre,
                apellido,
                correo,
                contrasena,
                telefono,
                genero,
                orientacionSexual,
                pais,
                idRol,
                avatarUrl,
            });

            // Generar un GUID para el id del usuario
            const guid = uuidv4();

            // Generar un hash para la contraseña antes de almacenarla
            const hashedPassword = await argon2.hash(contrasena);

            // Insertando el nuevo usuario en la base de datos y devolviendo el resultado
            const [result] = await pool.query(
                'INSERT INTO usuarios (nombre, apellido, correo, contraseña, telefono, genero, orientacionSexual, pais, idRol, guid, avatarUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
                    avatarUrl,
                ],
            );
            return result; // Devuelve el resultado de la inserción del usuario en la base de datos para su posterior uso
        } catch (error) {
            console.error('Error al crear el usuario en el modelo:', error);
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
            } = userData;

            // Actualizando la información del usuario en la base de datos
            const [result] = await pool.query(
                'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, telefono = ?, genero = ?, orientacionSexual = ?, pais = ? WHERE id = ?',
                [
                    nombre,
                    apellido,
                    correo,
                    telefono,
                    genero,
                    orientacionSexual,
                    pais,
                    userId,
                ],
            );
            return result[0]; // Devuelve el resultado de la actualización del usuario en la base de datos
        } catch (error) {
            console.error(
                'Error al actualizar el usuario en el modelo:',
                userData,
            );
            throw new Error(error);
        }
    }

    // Método para actualizar la img de perfil de un usuario
    static async updateAvatar({id, avatar}) {
        try {
            console.log('updateAvatar:', id, avatar);
            // Actualizando la información del usuario en la base de datos
            const [result] = await pool.query(
                'UPDATE usuarios SET avatarUrl = ? WHERE id = ?',
                [avatar, id],
            );
            return result; // Devuelve el resultado de la actualización del usuario en la base de datos
        } catch (error) {
            throw new Error(error);
        }
    }

    // Método para validar las contraseña del usuario antes de actualizar la nueva contraseña
    static async validatePassword({id, currentPassword}) {
        try {
            const [rows] = await pool.execute(
                'SELECT contraseña FROM usuarios WHERE id = ?',
                [id],
            );

            console.log('validatePassword:', rows);
            if (rows.length === 0) {
                throw new Error('Usuario no encontrado');
            }

            const user = rows[0];
            const isValidPassword = await argon2.verify(
                user.contraseña,
                currentPassword,
            );

            return isValidPassword;
        } catch (err) {
            console.error('Error al validar la contraseña:', err);
            throw err;
        }
    }

    // Método para actualizar la contraseña de un usuario
    static async updatePassword({id, newPassword}) {
        try {
            const hashedPassword = await argon2.hash(newPassword);

            const [result] = await pool.execute(
                'UPDATE usuarios SET contraseña = ? WHERE id = ?',
                [hashedPassword, id],
            );

            return result;
        } catch (err) {
            console.error('Error al actualizar la contraseña:', err);
            throw err;
        }
    }

    // Método para actualizar la información de un usuario
    /* static async updateUser(id, {userData}) {
        try {
            const {
                nombre,
                apellido,
                correo,
                telefono,
                genero,
                orientacionSexual,
                pais,
            } = userData;

            // Actualizando la información del usuario en la base de datos
            const [result] = await pool.query(
                'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, telefono = ?, genero = ?, orientacionSexual = ?, pais = ?, idRol = ? WHERE id = ?',
                [
                    nombre,
                    apellido,
                    correo,
                    telefono,
                    genero,
                    orientacionSexual,
                    pais,
                    id,
                ],
            );
            return result[0]; // Devuelve el resultado de la actualización del usuario en la base de datos
        } catch (error) {
            throw new Error(error);
        }
    } */

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

    // Método para eliminar un usuario por su ID
    static async deleteUser(userId) {
        try {
            const [result] = await pool.query(
                'DELETE FROM usuarios WHERE id = ?',
                [userId],
            );
            return result; // Devuelve el resultado de la eliminación del usuario
        } catch (error) {
            throw new Error(error);
        }
    }

    // Metodo para obtener la lista de usuarios
    static async getUsers() {
        try {
            const [rows] = await pool.query('SELECT * FROM usuarios');
            return rows; // Devuelve la lista de usuarios
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default userModel;
