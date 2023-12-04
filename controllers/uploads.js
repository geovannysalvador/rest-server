
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivos = async (req= request, res = response,) =>{

  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)  {
      res.status(400).json({
        msg: 'No hay archivos seleccionados'
      });
      return;
    }

    // Imagenes por defecto
    const pathCompleto = await subirArchivo(req.files);

    res.json({
        nombre: pathCompleto
    })
  
    

}


module.exports = {
    cargarArchivos
}