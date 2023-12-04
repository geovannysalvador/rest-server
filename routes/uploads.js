const { Router } = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { cargarArchivos, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

// rutas 

router.post('/', cargarArchivos);

router.put('/:coleccion/:id', [
    check('id', 'El Id debe de ser un Id de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])) ,
    validarCampos,
], actualizarImagen);


module.exports = router;