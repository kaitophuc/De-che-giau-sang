const express = require('express');
const { newEvent, getEvents } = require('../controllers/calendar/events');

const router = express.Router();

router.post('/event', newEvent);
router.get('/event', getEvents);
// router.post('/update_event', updateEvent);

module.exports = router;