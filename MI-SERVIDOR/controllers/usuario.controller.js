const usuarioService = require('../services/usuario.service');

exports.getAll = (req, res) => {
  usuarioService.getAll((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getById = (req, res) => {
  usuarioService.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  usuarioService.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, ...req.body });
  });
};

exports.update = (req, res) => {
  usuarioService.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: 'Usuario actualizado' });
  });
};

exports.delete = (req, res) => {
  usuarioService.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: 'Usuario eliminado' });
  });
};