const express = require("express");
const cors = require('cors');

class Server {
    constructor() {
        // Consgtructor
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares(Funion que siempre se ejecuta)
        this.middlewares();

        // LLamar las rutas
        this.routes();
    }

    middlewares() {
        // Cors. Proteger el server
        this.app.use(cors());
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port`, this.port);
        });
    }
}

module.exports = Server;
