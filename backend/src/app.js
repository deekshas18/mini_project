require('./db/mongoose');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
// Parse JSON bodies
app.use(bodyParser.json());

const env = require('dotenv');
env.config({path:__dirname + '/env/.env'});
const port = process.env.PORT;


const patientRouter = require('./routes/patient')
app.use("/api/patient", patientRouter)



app.listen(port,() => {
    console.log("server running on port ", port);
})