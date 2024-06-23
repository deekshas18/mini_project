
const Patient = require("../models/patientModel");

module.exports.register = async (req, res) => {
    try {
        const { name, idey, Details } = req.body;

        // Check if file was uploaded
        const fileKey = req.file ? req.file.key : null;

        const patient = new Patient({
            name: name,
            idey: idey,
            Details: fileKey ? { ...Details, newKey: [fileKey] } : Details
        });

        await patient.save();
        res.status(200).json(patient);
    } catch (e) {
        res.status(500).json(e.message);
        console.log(e.message);
    }
};

module.exports.update = async (req, res) => {
    try {
        const { idey, key } = req.params;

        // Check if file was uploaded
        const fileKey = req.file ? req.file.key : null;

        // Find the patient by idey
        let patient = await Patient.findOne({ idey: idey });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Initialize Details map if it does not exist
        if (!patient.Details) {
            patient.Details = new Map();
        }

        // Access the details based on the key
        if (!patient.Details.has(key)) {
            patient.Details.set(key, []);
        }

        if (fileKey) {
            const detailsArray = patient.Details.get(key);
            detailsArray.push(fileKey);
            patient.Details.set(key, detailsArray);
        }

        // Save the updated patient
        await patient.save();

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const { getFileUrls } = require("../middleware/s3Fetch"); 

module.exports.find = async (req, res) => {
    const { name } = req.params;

    try {
        let patient = await Patient.findOne({ name: name });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Iterate over patient details to fetch file URLs
        const detailsWithUrls = {};
        for (const [key, fileKeys] of patient.Details.entries()) {
            detailsWithUrls[key] = await getFileUrls(fileKeys);
        }

        // Add the URLs to the patient object
        const patientWithUrls = {
            ...patient._doc,
            Details: detailsWithUrls
        };

        res.status(200).json(patientWithUrls);
    } catch (e) {
        res.status(500).json(e.message);
        console.log(e.message);
    }
};


module.exports.getFileNames = async (req, res) =>{
    try{
        const idey = req.params;
    
        let userm = await Patient.findOne(idey)
        res.status(200).json(userm)
    }catch (e) {
        res.status(500).json(e.message);
        console.log(e.message);
    }
}

//not working---->>>>>
module.exports.deleteFile = async (req, res) => {
    // Assuming you may want to perform additional checks or operations before sending a response
    res.status(200).json({ message: "File deleted successfully" });
};

//get patient name 
module.exports.getpatientnames = async(req,res) =>{
        try {
            // Fetch all patient names from the database
            const patients = await Patient.find({}, 'name').select('name'); // Only select the 'name' field
            // Send the patient names as a response
            res.status(200).json(patients);
        } catch (e) {
            // Send a 500 status code and the error message if an exception occurs
            res.status(500).json({ error: e.message });
            console.log(e.message);
        }
    };


