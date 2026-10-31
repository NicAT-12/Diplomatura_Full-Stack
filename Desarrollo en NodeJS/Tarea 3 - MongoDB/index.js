const dns = require('dns');
dns.setServers(['8.8.8.8']);

require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const tareasRouter = require('./routes/tareas');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/tareas', tareasRouter);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
});