const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
});

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;