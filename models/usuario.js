// Como se vera la info en la BD

const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['ADMIN', 'USER']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.methods.toJSON = function (){
    const { __v, password, ...usuario} = this.toObject();
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);