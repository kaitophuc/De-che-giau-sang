const Event = require('../../models/Event.model');

const newEvent = async (req, res) => {
  const { title, place, startTime, endTime, description, tags } = req.query;

  const newEvent = new Event({
    title: title,
    place: place,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    description: description,
    tags: tags ? tags.split(',') : [],
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

const updateEvent = async (req, res) => {
  const { id, title, place, startTime, endTime, description, tags } = req.query;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title: title,
        place: place,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        description: description,
        tags: tags ? tags.split(',') : [],
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).send({ message: 'Event not found' });
    }

    res.status(200).send({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error updating event', error: error.message });
  }
}

const deleteEvent = async(req, res) => {
  const { id } = req.query;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).send({ message: 'Event not found' });
    }

    res.status(200).send({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting event', error: error.message });
  }
}

module.exports = {
  newEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};