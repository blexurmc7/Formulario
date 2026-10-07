const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');

app.use(cors());
app.use(express.json());

const routes = require('./routes/usuario.routes');
app.use('/usuarios', routes);

sequelize.sync().then(() => {
    console.log('BD conectada');
    app.listen(3000, () => {
        console.log('Servidor en puerto 3000');
    });
});
