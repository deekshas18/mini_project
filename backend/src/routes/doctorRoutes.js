const express = require('express');
const routes = express.Router();
const doctorControllers = require('../controllers/doctorControllers');

routes.post('/add-doctor',doctorControllers.addDoctor);
routes.get('/get-doctors',doctorControllers.getDoctors);
routes.put('/patientArray/:patientName/:DoctorName',doctorControllers.addPatient);

module.exports = routes;

