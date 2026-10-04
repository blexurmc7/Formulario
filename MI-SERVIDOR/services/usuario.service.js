const usuarioModel = require('../models/usuario.model');

exports.getAll = (cb) => usuarioModel.getAll(cb);

exports.getById = (id, cb) => usuarioModel.getById(id, cb);

exports.create = (usuario, cb) => usuarioModel.create(usuario, cb);

exports.update = (id, usuario, cb) => usuarioModel.update(id, usuario, cb);

exports.delete = (id, cb) => usuarioModel.delete(id, cb);