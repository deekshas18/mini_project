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
            res.status(200).json({"doctorUpdated":result});
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
        console.log(response);

        res.status(200).json({"DoctorsList":response});
    }catch(err){    
        console.log(err.message);
        res.status(500).json({"message":"Unable to fetch details of doctors"});
    }
}
module.exports.addDoctor = addDoctor;
module.exports.getDoctors = getDoctors;
