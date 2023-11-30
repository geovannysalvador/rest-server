const { Router, request, response } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { crearCategoria, optemerCategorias, optemerCategoria, actualizarCategorias, eliminarCategorias, } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');



const router = Router();


// rutas 

// Obtener todas las categorias - PUBLICO
router.get('/', [
    // No hay validaciones por ser publico
],optemerCategorias)

// Obtener una categoria por id - PUBLICO
router.get('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],optemerCategoria)

// Crear una nueva categoria - PRIVADO - Que tenga token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
    ], crearCategoria)

// Actualizar un registro por id - TOKEN VALIDO - PRIVADO
router.put('/:id', [

],actualizarCategorias)


// Borrar una categoria - PRIVADO - solo ADMIN
router.delete('/:id', [

],eliminarCategorias)


module.exports = router;