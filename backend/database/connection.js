const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect('mongodb+srv://phucking:N4a6pkS9QmWz0wnS@cluster0.0bgtfdd.mongodb.net/Calendar_service?retryWrites=true&w=majority&appName=Cluster0').then(() => {
      console.log(`Connected to database: ${mongoose.connection.name}`);
    });
  } catch (error) {
    console.log('Error connecting to the database');
    console.error(error);
  }
}

module.exports = connectDB;