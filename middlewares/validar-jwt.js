const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res = response, next) => {

    // Para leer lo header es usar la req
    const token = req.header('x-token');
    // Si no viene no ejecuta nada mas de la opcion de delete
    if(!token){
        return res.status(401).json({
            msg: 'No hay autorizacion - no hay token de acceso'
        });
    }

    try {
        // Ver el token y la firma
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.uid = uid;


        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'No hay autorizacion-token no valido'
        })
    }


    
}

module.exports = {
    validarJWT
}