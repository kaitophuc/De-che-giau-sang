const express = require('expresss');
const { newEvent } = require('../controllers/calendar/events');

const router = express.Router();

router.post('/new_event', newEvent);
// router.post('/update_event', updateEvent);

module.exports = router;