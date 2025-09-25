const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       const mongoURL = process.env.MONGO_URL;
       const conn = await mongoose.connect(mongoURL);
       console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
       console.error(`Error: ${error.message}`);
       process.exit(1);
    }
};

module.exports = connectDB;
