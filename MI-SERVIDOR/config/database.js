const { Sequelize } = require('sequelize');

const DB_TYPE = process.env.DB_TYPE || 'mysql';

let sequelize;

if (DB_TYPE === 'mysql') {
    sequelize = new Sequelize('demo', 'root', '1234', {
        host: 'localhost',
        dialect: 'mysql'
    });
}

if (DB_TYPE === 'mssql') {
    sequelize = new Sequelize('demo', 'sa', '123456', {
        host: 'localhost',
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false
            }
        }
    });
}

module.exports = sequelize;