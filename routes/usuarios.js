
const { Router } = require('express');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');

const router = Router();

// rutas 

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'El password debe tener 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol valido').isIn(['ADMIN', 'USER']),
    check('rol').custom( async (rol = "") => {
        const existeRol = await Role.findOne({rol});
        if (!existeRol){
            throw new Error(`El rol ${rol} no esta permitido`);
        }
    }),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);
 







module.exports = router;