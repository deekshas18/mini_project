const DoctorSchema = require('../models/doctorSchema')

const addDoctor = async(req,res) => {
    try{
        const {dname,specialization,patients} = req.body;

        console.log(req.body);
        const doctor = {
            'dname':dname,
            'specialization':specialization,
            'patients':patients
        }
        const doctorName = await DoctorSchema.findOne({ dname }).select({});
        if(!doctorName){
            const result = await DoctorSchema.create(doctor);
            console.log(result); 
            return res.status(200).json({'doctorAddedSuccessfully':result});
        }
        else{
            const result = await DoctorSchema.findOneAndUpdate(
                { dname }, 
                { $push: { patients: { $each: patients } } },
                { new: true });
            console.log(result);
            return res.status(200).json({"doctorUpdated":result});
        }
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({"message":"error in uploading doctor details"});
    }
}

const getDoctors = async(req,res) => {
    try{
        const response = await DoctorSchema.find({}).select("+dname +specialization +patients");
        // console.log(response);

        return res.status(200).json({"DoctorsList":response});
    }catch(err){    
        console.log(err.message);
        return res.status(500).json({"message":"Unable to fetch details of doctors"});
    }
}

const addPatient = async (req, res) => {
    try {
        const { patientName, DoctorName } = req.params;
        // Find the doctor by dname (DoctorName)
        let doctor = await DoctorSchema.findOne({ dname: DoctorName });

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Check if patientName already exists in the doctor's patients array
        // if (doctor.patients.includes(patientName)) {
        //     console.log("pat exists")
        //     return res.status(400).json({ message: "Patient already exists for this doctor" });
        // }

        // Add patientName to the doctor's patients array
        doctor.patients.push(patientName);
        // Save the updated doctor document
        await doctor.save();
        res.status(200).json({ message: "Patient added successfully", doctor });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "An error occurred" });
    }
};


module.exports.addDoctor = addDoctor;
module.exports.getDoctors = getDoctors;
module.exports.addPatient = addPatient;
