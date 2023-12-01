const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        // Consgtructor
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.buscarPath = '/api/buscar';
        this.categoriasPath = '/api/categorias';
        this.productosPath = '/api/productos';
        this.usuariosPath = '/api/usuarios';

        // Conectar a la BD
        this.conectarBD();

        // Middlewares(Funion que siempre se ejecuta)
        this.middlewares();

        // LLamar las rutas
        this.routes();
    }

    async conectarBD(){
        await dbConnection();
    }

    middlewares() {
        // Cors. Proteger el server
        this.app.use(cors());
        // Lectura y parseo del body usando POST.Serialisar a un json 
        this.app.use(express.json());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.buscarPath, require('../routes/busqueda'));
        this.app.use(this.categoriasPath, require('../routes/categorias'));
        this.app.use(this.productosPath, require('../routes/productos'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port`, this.port);
        });
    }
}

module.exports = Server;
