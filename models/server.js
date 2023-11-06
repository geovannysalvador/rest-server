const express = require("express");

class Server {
    constructor() {
        // Consgtructor
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares(Funion que siempre se ejecuta)
        this.middlewares();

        // LLamar las rutas
        this.routes();
    }

    middlewares(){
        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/saludo', (req, res) => {
            res.json({
                msg: 'Get API response get'
            });
        });

        this.app.put('/saludo', (req, res) => {
            res.json({
                msg: 'Get API response put'
            });
        });

        this.app.post('/saludo', (req, res) => {
            res.json({
                msg: 'Get API response post'
            });
        });

        this.app.delete('/saludo', (req, res) => {
            res.json({
                msg: 'Get API response delete'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port`, this.port);
        });
    }
}

module.exports = Server;
