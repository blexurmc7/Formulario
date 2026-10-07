const Usuario = require('../models/usuario.model');

exports.getAll = async () => {
    return await Usuario.findAll();
};

exports.getById = async (id) => {
    return await Usuario.findByPk(id);
};

exports.create = async (data) => {
    return await Usuario.create(data);
};

exports.update = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    return await usuario.update(data);
};

exports.delete = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    await usuario.destroy();
};
