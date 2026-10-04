const db = require('../config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

exports.getById = (id, callback) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

exports.create = (usuario, callback) => {
  db.query(
    'INSERT INTO usuarios (tipoDoc, numDoc, nombres, apellidos, correo, direccion, ciudad) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      usuario.tipoDoc,
      usuario.numDoc,
      usuario.nombres,
      usuario.apellidos,
      usuario.correo,
      usuario.direccion,
      usuario.ciudad
    ],
    callback
  );
};

exports.update = (id, usuario, callback) => {
  db.query(
    'UPDATE usuarios SET tipoDoc=?, numDoc=?, nombres=?, apellidos=?, correo=?, direccion=?, ciudad=? WHERE id=?',
    [
      usuario.tipoDoc,
      usuario.numDoc,
      usuario.nombres,
      usuario.apellidos,
      usuario.correo,
      usuario.direccion,
      usuario.ciudad,
      id
    ],
    callback
  );
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM usuarios WHERE id=?', [id], callback);
};