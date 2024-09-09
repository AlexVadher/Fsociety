import {Router} from 'express';
import pool from '../config/database.js';
import argon2 from 'argon2'; // hash de contraseñas
import {v4 as uuidv4} from 'uuid';

const router = Router();

// ruta para mostrar el formulario de registro de usuarios
router.get('/register', (req, res) => {
    try {
        res.render('users/register');
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// crear un nuevo usuario en la base de datos desde el formulario de registro de clientes en la aplicación
router.post('/register', async (req, res) => {
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
        } = req.body;

        // generar un GUID para el id del usuario
        const guid = uuidv4();

        // Generar un hash para la contraseña antes de almacenarla
        const hashedPassword = await argon2.hash(contraseña);

        const newUser = {
            nombre,
            apellido,
            correo,
            contraseña: hashedPassword, // Guardar la contraseña hasheada
            telefono,
            genero,
            orientacionSexual,
            pais,
            idRol,
            guid: guid,
        };

        console.log('Datos del nuevo usuario:', newUser); // Log para verificar los datos

        const result = await pool.query('INSERT INTO usuarios SET ?', [
            newUser,
        ]);
        console.log('Resultado de la inserción:', result); // Log para verificar el resultado de la inserción

        res.redirect('/login'); // redirigir a la página de inicio de sesión
    } catch (err) {
        console.error('Error al insertar el usuario:', err); // Log para verificar el error
        res.status(500).json({message: err.message});
    }
});

// listar todos los usuarios registrados en panel de administración
router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM users');
        res.render('admin/list', {users: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Editar un usuario por su id en el panel de administración
router.get('/edit/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [
            id,
        ]);
        const userEdit = user[0];
        res.render('admin/edit', {user: userEdit});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Eliminar un usuario por su id en el panel de administración
router.get('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.redirect('/users/list');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router;
