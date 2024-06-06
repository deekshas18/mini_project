require('./db/mongoose');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
// Parse JSON bodies
app.use(bodyParser.json());

const env = require('dotenv');
env.config({path:__dirname + '/env/.env'});
const port = process.env.PORT;

<<<<<<< HEAD

const patientRouter = require('./routes/patient')
app.use("/api/patient", patientRouter)


=======
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctor-routes/',doctorRoutes);
>>>>>>> 89c8fe5f65e83125df4b99097240d802ca211d95

app.listen(port,() => {
    console.log("server running on port ", port);
})