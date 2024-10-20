const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://phucking:N4a6pkS9QmWz0wnS@cluster0.0bgtfdd.mongodb.net/Calendar_service?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    //console.log('Connected to database');
    console.log(`Connected to database: ${mongoose.connection.name}`);
});

const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    }
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

//http://localhost:5050/new_event?date=2024-09-15&description=This%20is%20a%20test%20description&title=Test%20Event&place=Test%20Place&start_date=2024-09-15&end_date=2024-09-15
app.get('/new_event', (req, res) => {
    // Access the query parameters from the URL
    const { title, place, start_date, end_date, description } = req.query;

    // Validate the query parameters
    if (isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))) {
        return res.status(400).send('Invalid date format');
    }

    // Create a new event instance
    const newEvent = new Events({
        title: title,
        place: place,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
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
    // Access the query parameters from the URL
    const { date, description } = req.query;

    // Create a new event instance
    const newEvent = new Events({
        date: new Date(date),
        description: description
    });

    // Delete the new event from the database
    Events.deleteMany({date: new Date(date), description: description}).then((event) => {
        res.json(event);
        console.log(event);
    }).catch(function(err){
        console.log(err);
    });
});


app.listen(5050, () => {
  console.log('Server is running on port 5050');
});
