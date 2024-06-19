const express = require('express');
const routes = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const pythonControllers = require('../controllers/pythonScriptControllers');

routes.post('/convert-to-text',upload.single('file'), pythonControllers.convertToText);
routes.post('/summarize-text',upload.single('file'),pythonControllers.summarizeText);
module.exports = routes;