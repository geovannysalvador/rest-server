
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");


const cargarArchivos = async (req= request, res = response,) =>{

  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)  {
      res.status(400).json({
        msg: 'No hay archivos seleccionados'
      });
      return;
    }

  
    try {
    // subir txt, md. USANDO que extesiones quiero y si quier una carpeta
    // const pathCompleto = await subirArchivo(req.files, ['txt', 'md'], 'textos' );
    // Imagenes por defecto
    const pathCompleto = await subirArchivo(req.files, undefined, 'imgs');

    res.json({
        nombre: pathCompleto
    })
  
    } catch (msg) {
        res.status(400).json({msg});
    }
    

}


module.exports = {
    cargarArchivos
}