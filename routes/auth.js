const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const dotenv = require('dotenv');
const auth = require('../middleware/auth');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

router.post('/login', (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res.status(400).json({ success: false, message: 'Phone number required' });
    }

    const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
});

module.exports = router;