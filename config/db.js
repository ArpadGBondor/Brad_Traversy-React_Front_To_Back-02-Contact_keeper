const mongoose = require('mongoose');
const db = process.env.DB_CONNECT;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected.');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
