const express = require('express');
const { newEvent, getEvents } = require('../controllers/calendar/events');

const calendarRouter = express.Router();

calendarRouter.post('/event', newEvent);
calendarRouter.get('/event', getEvents);
// router.post('/update_event', updateEvent);

module.exports = calendarRouter;