const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipoDoc: {
        type: DataTypes.STRING
    },
    numDoc: {
        type: DataTypes.STRING
    },
    nombres: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;