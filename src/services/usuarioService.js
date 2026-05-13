/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para gestionar usuarios
 */

const db = require('../config/db');
const Usuario = require('../entities/Usuario');

const usuarioRepository = db.getRepository(Usuario);

/**
 * Crear un nuevo usuario
 * @param {Object} datosUsuario - { nombre, apellido, email, edad }
 * @returns {Object} El usuario creado
 */
const crearUsuario = async (datosUsuario) => {
  const nuevoUsuario = usuarioRepository.create(datosUsuario);
  return await usuarioRepository.save(nuevoUsuario);
};

/**
 * Obtener todos los usuarios
 * @returns {Array} Array de todos los usuarios
 */
const obtenerTodosLosUsuarios = async () => {
  return await usuarioRepository.find(); //el await consulta la base de datos es asincrono
  return [];
};

/**
 * Obtener un usuario por ID
 * @param {Number} id - ID del usuario
 * @returns {Object|null} El usuario encontrado o null
 */
const obtenerUsuarioPorId = async (id) => {
  return await usuarioRepository.findOneBy({ id }); // busca usuarios por id 
};

/**
 * Actualizar un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario actualizado o null si no existe
 */
const actualizarUsuario = async (id, datosActualizados) => {
  await usuarioRepository.update(id, datosActualizados);
  return await obtenerUsuarioPorId(id);
};

/**
 * Eliminar un usuario
 * @param {Number} id - ID del usuario
 * @returns {boolean} true si se eliminó, false si no existe
 */
const eliminarUsuario = async (id) => {
  const result = await usuarioRepository.delete(id); 
  return result.affected > 0 ? true : false; //filas afectadas 
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
