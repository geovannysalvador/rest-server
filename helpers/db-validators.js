const Role = require('../models/role');
// Importar modelo 
// const Usuario = require('../models/usuario');
// Nueva forma de importarlo
const { Categoria, Usuario } = require('../models');

const esRolValido = async (rol = "") => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta permitido`);
    }
}

const emaiExiste = async (correo = "") => {
    // Ver si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} esta registrado`);
    }
}

const idUsuarioExiste = async (id) => {
    // Ver si el correo existe
    const existeUsuarioId = await Usuario.findById(id);
    if (!existeUsuarioId) {
        throw new Error(`El Id: ${id} no existe`);
    }
}
// Calidadores de categorias
const existeCategoria =  async(id) => {
        // Ver si la categoria existe
        const existeCategoriaId = await Categoria.findById(id);
        if (!existeCategoriaId) {
            throw new Error(`El Id: ${id} no existe`);
        }
}



module.exports = {
    esRolValido,
    emaiExiste,
    idUsuarioExiste,
    existeCategoria,
}