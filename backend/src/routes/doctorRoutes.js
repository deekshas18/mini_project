const express = require('express');
const routes = express.Router();
const doctorControllers = require('../controllers/doctorControllers');

routes.post('/add-doctor',doctorControllers.addDoctor);
routes.get('/get-doctors',doctorControllers.getDoctors);
module.exports = routes;