const { response, request } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')



const login = async (req=request, res = response) => {

    const {correo, password} = req.body;

    // Por si sale algo mal usar el try catch

    try {
        // ver si el correo existe 
        const usuario = await Usuario.findOne({correo});
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'El correo Incorrecto'
            })
        }
        // Si el usuario esta activo (no eliminado)
        if ( !usuario.estado   ) {
            return res.status(400).json({
                msg: 'El Usuario no existe'
            })
        }
        // verificar la contrase;a
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if ( !validarPassword   ) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }
        // Generar un JWT

        res.json({
            msg: 'login exitoso',
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: 'Algo salio mal'
        })
    }



}



module.exports = {
    login,
}

