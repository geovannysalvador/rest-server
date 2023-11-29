const { response, request, json } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



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
        // Usar un JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token,
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            msg: 'Algo salio mal'
        })
    }



}

const googleSingIn = async ( req=request, res = response ) =>{

    const {id_token} = req.body;

    try {
        
        const googleUser = await googleVerify(id_token);
        console.log(googleUser);

        res.json({
            msg: 'Todo bien Google Singin',
            id_token
        });

    } catch (error) {
        json.status(400).json({
            msg: 'El token no se pudo verificar'
        });
    }


}

module.exports = {
    login,
    googleSingIn,
}

