const express = require("express");
const patientController = require("../controllers/patientController");
const { uploadToAws } = require("../middleware/s3Upload"); 
const deleteFileMiddleware = require("../middleware/s3Delete");

const router = express.Router();

router.post('/register', uploadToAws, patientController.register);
router.put('/update/:idey/:key', uploadToAws, patientController.update);
router.get('/find/:name', patientController.find);
router.get('/getfiles/:idey', patientController.getFileNames);
router.delete('/delete/:idey/:filename', deleteFileMiddleware, patientController.deleteFile);
router.get('/getpatientnames',patientController.getpatientnames)
router.get('/getpatientid',patientController.getpatientid)


module.exports = router;
