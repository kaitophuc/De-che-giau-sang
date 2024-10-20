const mongoose = require('../../config/connection');

const newEvent = async (req, res) => {
  const { eventTitle, place, startTime, endTime, description } = req.body;
  
  const EventSchema = new mongoose.Schema({
    eventTitle: String,
    place: String,
    startTime: Date,
    endTime: Date,
    description: String,
  });

  const Event = mongoose.model('Calendar', EventSchema);

  const newEvent = new Event({
    eventTitle: eventTitle,
    place: place,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    description: description,
  });

  try {
    await newEvent.save();
    res.status(201).send('Event created successfully');
  } catch (error) {
    res.stats(500).send('Error creating event: ' + error.message);
  }
}

module.exports = {
  newEvent,
};