require('./db/mongoose');
const express = require('express');
const app = express();

const env = require('dotenv');
env.config({path:__dirname + '/env/.env'});
const port = process.env.PORT;

const bodyParser = require('body-parser');
app.use(bodyParser.json())
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctor-routes/',doctorRoutes);

const pythonRoutes = require('./routes/pythonScriptRoutes');
app.use('/api/python-routes/',pythonRoutes);

app.listen(port,() => {
    console.log("server running on port ", port);
})