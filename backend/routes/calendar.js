const express = require('express');
const { newEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/calendar/events');
const { sync_google_calendar } = require('../controllers/calendar/calendar_sync');

const calendarRouter = express.Router();

calendarRouter.post('/event', newEvent);
calendarRouter.get('/event', getEvents);
calendarRouter.put('/event', updateEvent);
calendarRouter.delete('/event', deleteEvent);
// calendarRouter.post('/sync-google', sync_google_calendar);

module.exports = calendarRouter;