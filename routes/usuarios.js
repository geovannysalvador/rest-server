
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emaiExiste, idUsuarioExiste } = require('../helpers/db-validators');


const router = Router();

// rutas 

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    check('rol').custom( esRolValido ),
    // validarcampos Ve si hay problemas si lo hay no continua con 
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre no es valido').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emaiExiste),
    check('password', 'El password debe tener 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol valido').isIn(['ADMIN', 'USER']),
    check('rol').custom( esRolValido ),
    //validarcampos Ve si hay problemas si lo hay no continua con el UsuaruiosPost
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(idUsuarioExiste),
    //validarcampos Ve si hay problemas si lo hay no continua con el UsuaruiosPost
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);
 







module.exports = router;