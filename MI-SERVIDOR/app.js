const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Habilita las peticiones desde el frontend de React
app.use(express.json());

const usuarioRoutes = require('./routes/usuario.routes');

app.use('/usuarios', usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor backend corriendo en http://localhost:3000');
});