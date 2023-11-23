// Se importa porque no sabe que es res por ello se coloca res = response. Aunque sea redundante
const { response, request } = require('express');
// Encriptar contrasenia
const bcryptjs = require('bcryptjs')
// Importar modelo 
const Usuario = require('../models/usuario');


// Crear funciones y exportarlas al archivo de routes/usuarios

const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0 } = req.query;

    // Ambos await deben de ir juntos ya que no depende uno del otro para continuar 
    // No continua hastq que ambas funciones y se ejecutan ambas
    // const resp = await Promise.all([
        const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado: true }),
        Usuario.find({estado: true })
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    // res.json({resp});
    res.json({
        total,
        usuarios,
    });
}

const usuariosPut = async (req, res = response) => {

    // En la ruta de indico que es ID y se obtoene de la siguiente forma
    const {id} = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    // validar contra la BAse de datos si existe password
    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Usuario actualizado',
        usuario
    });
}

const usuariosPost = async (req = request, res = response) => {


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

const usuariosDelete = async (req = request, res = response) => {

    const {id} = req.params;

    // Eliminacion fisica de la BD
    // const usuario = await Usuario.findByIdAndDelete(id);
    // Cambiarle el estado y no borrarlo permanetemente
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false });

    res.json({
        msg: 'Usuario eliminado',
        usuario,
    });
}

const usuariosPatch = (req =  request, res = response) => {
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