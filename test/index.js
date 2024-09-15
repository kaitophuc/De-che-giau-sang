const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://phucking:N4a6pkS9QmWz0wnS@cluster0.0bgtfdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to database');
});

const UserSchema = new mongoose.Schema({
    date: Date,
    description: String,
});

app.get('/Calendar_service', (req, res) => {
    const Events = mongoose.model('Calendar', UserSchema);

    Events.find({}).then((event) => {
        res.json(event);
        console.log(event);
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/new_event', (req, res) => {
    const Events = mongoose.model('Calendar', UserSchema);

    const sample_event = new Events({
        date: '',
        description: 'Sample event',
    });
    // const event = new Events({
    //     date: req.body.date,
    //     description: req.body.description,
    // });
    sample_event.save().then((event) => {
        res.json(event);
        console.log("What the fuck???");
        console.log(event);
    }).catch(function(err){
        console.log(err);
    });
});

app.listen(5050, () => {
  console.log('Server is running on port 5050');
});
