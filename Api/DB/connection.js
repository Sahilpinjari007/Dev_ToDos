require('dotenv').config();
const mongoose = require("mongoose");



const connectDB = () => {

    mongoose.connect(process.env.MONGO_CONNECTION_URL);
    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('Connected To Database!');
    }).on('error', () => {
        console.log('Connection failed!');
    });
}

module.exports = connectDB;

