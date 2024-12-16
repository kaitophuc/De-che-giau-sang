const express = require('express');
const { newEvent, getEvents } = require('../controllers/calendar/events');
const { sync_google_calendar } = require('../controllers/calendar/calendar_sync');

const calendarRouter = express.Router();

calendarRouter.post('/event', newEvent);
calendarRouter.get('/event', getEvents);
// router.post('/update_event', updateEvent);
calendarRouter.post('/sync-google', sync_google_calendar);

module.exports = calendarRouter;