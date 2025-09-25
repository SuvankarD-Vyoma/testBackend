const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    
    name: {
        type: String,
        // required: true,
    },
    phone: {
        type: Number,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    salary:{
        type: Number,
        // required: true,
    },
    password : {
        type: String,
        // required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
