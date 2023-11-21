// Se importa porque no sabe que es res por ello se coloca res = response. Aunque sea redundante
const { response, request } = require('express');
// Encriptar contrasenia
const bcryptjs = require('bcryptjs')
// Importar modelo 
const Usuario = require('../models/usuario');


// Crear funciones y exportarlas al archivo de routes/usuarios

const usuariosGet = (req = request, res = response) => {

    // const query = req.query;
    const {q, nombre, apiKey} = req.query;

    res.json({
        msg: 'Get API response get - controllers',
        q, 
        nombre,
        apiKey
    });
}

const usuariosPut = (req, res = response) => {

    // En la ruta de indico que es ID y se obtoene de la siguiente forma
    const {id} = req.params;

    res.json({
        msg: 'Get API response put - controllers',
        id
    });
}

const usuariosPost = async (req, res = response) => {


    // Aca extraemos la data que se envia
    const {nombre, correo, password, rol} = req.body;
    // Crea la instancia crear el movelo con los que necesitamos
    const usuario = new Usuario({nombre, correo, password, rol});
    // Ver si el correo existe>> este se creo ebn los helpers para mejor codificacion
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )
    // Graba el registro en BD
    await usuario.save();

    res.json({
        usuario,
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Get API response delete - controllers'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Get API response patch - controllers'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}