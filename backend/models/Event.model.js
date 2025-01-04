const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  place: String,
  startTime: Date,
  endTime: Date,
  description: String,
  tags: [String],
  userId: String,
});

const Event = mongoose.model('Calendar', EventSchema);

module.exports = Event;