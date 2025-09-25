const mongoose = require('mongoose');
const Employee = require('../model/data');

const express = require('express');
const router = express.Router();


router.post('/employees', async (req, res) => {
    try {
        const { name, email, phone, salary, password } = req.body;
        try {
            const newEmployee = new Employee({
                name,
                email,
                phone,
                salary,
                password
            });
            await newEmployee.save();
            res.status(201).json({ success:true,  message: 'Employee created successfully', employee: newEmployee });
        } catch (error) {
            res.status(500).json({ success:false, message: 'Error creating employee', error });
        }


    } catch (error) {
        res.status(500).json({ success:false, message: 'Server error', error });
    }       
});

router.post('/:id/update', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid employee ID' });
        }
        
        console.log("Updating employee with ID:", id);
        const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedEmployee) {
            console.log("Employee not found with ID:", id);
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        
        res.status(200).json({ success: true, message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

router.post('/:id/delete', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid employee ID' });
        }   
        const deletedEmployee = await Employee.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedEmployee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        res.status(200).json({ success: true, message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

router.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q ;
        const employees = await Employee.find({
            isDeleted: false,
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { email: { $regex: searchQuery, $options: 'i' } },
            ]
        });

        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
});

module.exports = router;