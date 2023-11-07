// Se importa porque no sabe que es res por ello se coloca res = response. Aunque sea redundante
const { response } = require('express')

// Crear funciones y exportarlas al archivo de routes/usuarios

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'Get API response get - controllers'
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'Get API response put - controllers'
    });
}

const usuariosPost = (req, res = response) => {

    // Aca extraemos la data que se envia
    const body = req.body;

    res.json({
        msg: 'Get API response post - controllers',
        body
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