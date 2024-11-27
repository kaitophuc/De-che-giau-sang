const Event = require('../../models/Event.model');

const newEvent = async (req, res) => {
  const { title, place, startTime, endTime, description } = req.query;

  const newEvent = new Event({
    title: title,
    place: place,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    description: description,
    userId: req.user.id,
  });

  try {
    await newEvent.save();
    res.status(201).send({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error creating event', error: error.message });
  }
}

const getEvents = async (req, res) => {
  const { startTime, endTime } = req.query;

  try {
    const events = await Event.find({
      startTime: { $gte: new Date(startTime) },
      endTime: { $lte: new Date(endTime) },
      userId: req.user.id,
    });
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching events', error: error.message });
  }
}

module.exports = {
  newEvent, getEvents
};