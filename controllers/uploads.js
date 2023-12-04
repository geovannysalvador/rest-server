const path = require('path')
const { request, response } = require("express");


const cargarArchivos = (req= request, res = response,) =>{

  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)  {
      res.status(400).json({
        msg: 'No hay archivos seleccionados'
      });
      return;
    }

  
    const {archivo} = req.files;
  
    const uploadPath = path.join( __dirname, '../uploads/',  archivo.name);
  
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