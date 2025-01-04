const express = require('express');
const { newEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/events');

const calendarRouter = express.Router();

calendarRouter.post('/event', newEvent);
calendarRouter.get('/event', getEvents);
calendarRouter.put('/event', updateEvent);
calendarRouter.delete('/event', deleteEvent);

module.exports = calendarRouter;