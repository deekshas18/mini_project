const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    }, 
    idey:{
        type:String,
        required:true
    },
    Details: {
        type: Map,
        of: [String]
    }
});

module.exports = mongoose.model("Patient", patientSchema)


