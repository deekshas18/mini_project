require('./db/mongoose');
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const env = require('dotenv');
env.config({path:__dirname + '/env/.env'});
const port = process.env.PORT;

const cors = require('cors');
app.use(express.json());
const allowedDomains = "http://localhost:3000";
app.use(cors({
    credentials:true,
    origin:function (origin, callback) {
        // bypass the requests with no origin
        if (!origin) return callback(null, true);
        if (allowedDomains.indexOf(origin) === -1) {
            let msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))

const patientRouter = require('./routes/patient')
app.use("/api/patient", patientRouter)

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctor-routes/',doctorRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user',userRoutes);


// const doctorRoutes = require('./routes/doctorRoutes');
// app.use('/api/doctor-routes/',doctorRoutes);

const pythonRoutes = require('./routes/pythonScriptRoutes');
app.use('/api/python-routes/',pythonRoutes);

app.listen(port,() => {
    console.log("server running on port ", port);
})