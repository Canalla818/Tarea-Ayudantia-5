/**
 * Rutas de Usuarios
 * Aquí definimos los endpoints relacionados con usuarios
 */

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// POST /usuarios - Crear un nuevo usuario (IMPLEMENTADO)
router.post('/', usuarioController.crearUsuario);

// GET /usuarios - Obtener todos los usuarios
 router.get('/', usuarioController.obtenerTodosLosUsuarios);

// GET /usuarios/:id - Obtener un usuario específico
 router.get('/:id', usuarioController.obtenerUsuarioPorId);

// PATCH /usuarios/:id - Actualizar un usuario
 router.patch('/:id', usuarioController.actualizarUsuario);

// DELETE /usuarios/:id - Eliminar un usuario
 router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
