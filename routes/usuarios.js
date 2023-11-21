
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emaiExiste } = require('../helpers/db-validators');


const router = Router();

// rutas 

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emaiExiste),
    check('password', 'El password debe tener 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol valido').isIn(['ADMIN', 'USER']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);
 







module.exports = router;