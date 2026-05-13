/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP relacionadas con usuarios
 */

const { sendSuccess, sendError } = require('../handlers/responseHandler');
const usuarioService = require('../services/usuarioService');
const { createUsuarioSchema, updateUsuarioSchema } = require('../validations/usuarioValidation');

/**
 * POST /usuarios
 * Crea un nuevo usuario
 */
const crearUsuario = async (req, res) => {
  try {
    // 1. Validamos los datos de entrada con Joi
    const { error, value } = createUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message)
      );
    }

    // 2. Llamamos al servicio para crear el usuario
    const usuarioCreado = await usuarioService.crearUsuario(value);

    // 3. Respondemos con éxito
    return sendSuccess(
      res,
      usuarioCreado,
      'Usuario creado exitosamente',
      201
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 'Error al crear usuario', 500);
  }
};

/**
 * GET /usuarios
 * Obtiene todos los usuarios
 */
const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosLosUsuarios();
    return sendSuccess(res, usuarios, 'Usuarios obtenidos exitosamente');
  } catch (error) {
    return sendError(res, 'Error al obtener usuarios', 500);
  }
};

/**
 * GET /usuarios/:id
 * Obtiene un usuario específico por ID
 */
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params; 
    const usuario = await usuarioService.obtenerUsuarioPorId(id); //buscamos usuario por id 
    if (!usuario) {
      return sendError(res, 'Usuario no encontrado', 404); //si no existe mostramos error 404 
    }
    return sendSuccess(res, usuario, 'Usuario obtenido exitosamente');
  } catch (error) {
    return sendError(res, 'Error al obtener usuario', 500);
  }
};

/**
 * PATCH /usuarios/:id
 * Actualiza un usuario existente
 */
const actualizarUsuario = async (req, res) => {
  try {
    const { error, value } = updateUsuarioSchema.validate(req.body); //validamos datos con joi 
    if (error) {
      return sendError(
        res,
        'Error en validación de datos',
        400,
        error.details.map(err => err.message) //si hay error respondemos con detalles del error 
      );
    }
    const { id } = req.params; 
    const usuarioActualizado = await usuarioService.actualizarUsuario(id, value); 
    if (!usuarioActualizado) { //si no se pudo actuqlizar mostramos error 404 
      return sendError(res, 'Usuario no encontrado', 404);
    }
    return sendSuccess(res, usuarioActualizado, 'Usuario actualizado exitosamente'); //respondemos con el usuario actualizado
  } catch (error) {
    return sendError(res, 'Error al actualizar usuario', 500);
  }
};

/**
 * DELETE /usuarios/:id
 * Elimina un usuario
 */
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await usuarioService.eliminarUsuario(id); // llamamos servicio eliminar usuario por id 
    if (!eliminado) { 
      return sendError(res, 'Usuario no encontrado', 404); // error 404 si no se encontro usuario para eliminar 
    }
    return sendSuccess(res, null, 'Usuario eliminado exitosamente'); // exito al eliminar usuario 
  } catch (error) {
    return sendError(res, 'Error al eliminar usuario', 500);
  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
