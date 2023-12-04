const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { request, response } = require("express");


const cargarArchivos = (req= request, res = response,) =>{

  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)  {
      res.status(400).json({
        msg: 'No hay archivos seleccionados'
      });
      return;
    }

  
    const {archivo} = req.files;
    // formato para separar despues de un punto
    const nombrecortado = archivo.name.split('.');
    // Extraer la extension 
    const extension = nombrecortado [nombrecortado.length -1 ];
    // Extensiones permitidas, validaciones
    const extensionValida = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionValida.includes(extension)){
        res.status(400).json({
            msg: `La extension: ${extension} no es permitida`
        })
    }

  
    const nombreTemporal = uuidv4() + '.' + extension;  
    const uploadPath = path.join( __dirname, '../uploads/', nombreTemporal );
  
    archivo.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({err});
      }
  
      res.json({
        msg: 'El archivo se subio a:  ' + uploadPath
    });
    });

}


module.exports = {
    cargarArchivos
}