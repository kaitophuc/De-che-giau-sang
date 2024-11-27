const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect('process.env.MONGODB_URI').then(() => {
      console.log(`Connected to database: ${mongoose.connection.name}`);
    });
  } catch (error) {
    console.log('Error connecting to the database');
    console.error(error);
  }
}

module.exports = connectDB;