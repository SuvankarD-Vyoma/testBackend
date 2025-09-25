const express = require('express');

const dotenv = require('dotenv');
const connectDB = require('./config/dbConnect');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.send('Test endpoint is working!');
});

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


const employeeRoutes = require('./routes/employees');
const auth = require('./middleware/auth');
app.use('/api', auth, employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});