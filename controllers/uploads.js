const path = require('path')
const fs = require('fs');
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require('../models');


const cargarArchivos = async (req = request, res = response,) => {

    // Ya se uso el mismo codigo en el apartado de middlewares en el validar-archivo
    // Tambien se mando a llamar en la ruta para que verifique primero
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({
    //         msg: 'No hay archivos seleccionados'
    //     });
    //     return;
    // }


    try {
        // subir txt, md. USANDO que extesiones quiero y si quier una carpeta
        // const pathCompleto = await subirArchivo(req.files, ['txt', 'md'], 'textos' );
        // Imagenes por defecto
        const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            nombre: pathCompleto
        })

    } catch (msg) {
        res.status(400).json({ msg });
    }


}


const actualizarImagen = async (req = request, res = response) => {

    // Ya se uso el mismo codigo en el apartado de middlewares en el validar-archivo
    // Tambien se mando a llamar en la ruta para que verifique primero
    // if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    //     res.status(400).json({
    //         msg: 'No hay archivos seleccionados'
    //     });
    //     return;
    // }

    const { id, coleccion, } = req.params;

    // Establecer el valor de forma condicional por ello se usa let
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            // Verificar si la coleccion tiene un ID
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                });
            }

            break;

        case 'productos':
            // Verificar si la coleccion tiene un ID
            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Olvide validar esto' });
    }

    // Borrar la ultima imagen si es que existe luego subir la nueva
    // Antes de subir limpiar o borrar la img previao anterior
    // Si la propiedad existe entra dentro del:     if( modelo.img 
    if( modelo.img ){
        // verificar la img del servidor y borrarla
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        // Ver si existe la imagen en si en la bd
        if(fs.existsSync( pathImagen )){
            fs.unlinkSync(pathImagen);
        }

    }

    // Actualziar la imagen 
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    // Guardar en BD
    await modelo.save();

    res.json({
        modelo
    });
}

const mostrarImagen = async (req = request, res = response) => {

    const { id, coleccion, } = req.params;

    // Establecer el valor de forma condicional por ello se usa let
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            // Verificar si la coleccion tiene un ID
            modelo = await Usuario.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id: ${id}`
                });
            }

            break;

        case 'productos':
            // Verificar si la coleccion tiene un ID
            modelo = await Producto.findById(id);

            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id: ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Olvide validar esto' });
    }

    if( modelo.img ){
        // verificar la img del servidor y borrarla
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        // Ver si existe la imagen en si en la bd
        if(fs.existsSync( pathImagen )){
            return res.sendFile(pathImagen);
        }

    }

        const pathNoImagen = path.join( __dirname, '../assets/noimage-220518-150756.jpg');
        res.sendFile(pathNoImagen);

}


module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
}