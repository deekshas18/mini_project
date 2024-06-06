const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    dname:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    patients:{
        type:Array,
        default:null
    },
},{timestamps:true});

module.exports = mongoose.model('DoctorSchema',doctorSchema)