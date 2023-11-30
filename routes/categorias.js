const { Router, request, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();


// rutas 

// Obtener todas las categorias - PUBLICO
router.get('/', (request, response) => {
    response.json('GEt ALL');
})
// Obtener una categoria por id - PUBLICO
router.get('/:id', (request, response) => {
    response.json('GET ONE BY ID');
})

// Crear una nueva categoria - PRIVADO - Que tenga token valido
router.post('/', (request, response) => {
    response.json('POST NEW CATEGORIA');
})

// Actualizar un registro por id - TOKEN VALIDO - PRIVADO
router.put('/:id', (request, response) => {
    response.json('PUT REGISTRO POR ID');
})


// Borrar una categoria - PRIVADO - solo ADMIN
router.delete('/:id', (request, response) => {
    response.json('DELETE CATEGORIA, ESTADO');
})


module.exports = router;