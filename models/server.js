const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        // Consgtructor
        this.app = express();
        this.port = process.env.PORT;
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
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port`, this.port);
        });
    }
}

module.exports = Server;
