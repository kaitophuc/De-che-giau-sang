const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://phucking:N4a6pkS9QmWz0wnS@cluster0.0bgtfdd.mongodb.net/Calendar_service?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    //console.log('Connected to database');
    console.log(`Connected to database: ${mongoose.connection.name}`);
});

const UserSchema = new mongoose.Schema({
    date: Date,
    description: String,
});

const Events = mongoose.model('Calendar', UserSchema);

app.get('/Calendar_service', (req, res) => {
    Events.find({}).then((event) => {
        res.json(event);
        console.log(event);
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/new_event', (req, res) => {
    // Access the query parameters from the URL
    const { date, description } = req.query;

    // Create a new event instance
    const newEvent = new Events({
        date: new Date(date),
        description: description
    });

    // Save the new event to the database
    newEvent.save().then((event) => {
        res.json(event);
        console.log(event);
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error saving event');
    });
});

app.get('/delete_event', (req, res) => {
    Events.deleteMany({}).then((event) => {
        res.json(event);
        console.log(event);
    }).catch(function(err){
        console.log(err);
    });
});

app.listen(5050, () => {
  console.log('Server is running on port 5050');
});
