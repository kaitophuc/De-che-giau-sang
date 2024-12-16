const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://phucking:N4a6pkS9QmWz0wnS@cluster0.0bgtfdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Calendar_service');

const UserSchema = new mongoose.Schema({
    date: Date,
    description: String
});

const Events = mongoose.model('event', UserSchema);

app.get('/Calendar_service', (req, res) => {
    Events.find({}).then(function(event){
        res.json(event);
        console.log(event);
    }).catch(function(err){
        console.log(err);
    });
});

app.listen(5050, () => {
  console.log('Server is running on port 5050');
});
