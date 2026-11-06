const dns = require('dns');
dns.setServers(['8.8.8.8']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const tareasRouter = require('./routes/tareas');

const app = express();
const PORT = process.env.PORT;

const origenesPermitidos = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origen) => origen.trim())
    .filter(Boolean);

app.use(cors({ origin: origenesPermitidos }));
app.use(express.json());
app.use('/tareas', tareasRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});
