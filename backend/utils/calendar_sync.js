const { google } = require('googleapis');
const { Client } = require('@microsoft/microsoft-graph-client');
const Event = require('../models/Event.model');
require('isomorphic-fetch');

const sync_google_calendar = async (user) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:5173/',
  )
  auth.setCredentials({
    access_token: user.googleAccessToken,
    refresh_token: user.googleRefreshToken,
  })

  console.log("User", user);
  const calendar = google.calendar({ version: 'v3', auth });

  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  calendar.events.list({
    calendarId: 'primary',
    timeMin: sixMonthsAgo.toISOString(),
    timeMax: now.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) {
      console.error('The API returned an error: ' + err);
    } else {
      const events = res.data.items;
      for (let event of events) {
        const startTime = new Date(event.start.dateTime);
        const endTime = new Date(event.end.dateTime);
        console.log(startTime);
        console.log(endTime);
        console.log(startTime.toISOString());
        console.log(endTime.toISOString());
        const newEvent = new Event({
          title: event.summary,
          place: event.location,
          description: event.description,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          userId: user._id,
        });
        newEvent.save();
      }
      console.log("Events from last 6 months", events);
    }
  })

  // const jwtClient = new google.auth.JWT(
  //   process.env.GOOGLE_CLIENT_EMAIL,
  //   null,
  //   process.env.GOOGLE_PRIVATE_KEY,
  //   ['https://www.googleapis.com/auth/calendar.readonly'],
  // )
}

const sync_microsoft_outlook = async (user) => {
  const accessToken = user.microsoftAccessToken;

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  try {
    const events = await client
      .api('/me/calendar/events')
      .filter(`start/dateTime ge '${sixMonthsAgo.toISOString()}' and end/dateTime le '${now.toISOString()}'`)
      .get();

    console.log("Events from last 6 months", events.value);

    for (let event of events.value) {
      const startTime = new Date(event.start.dateTime);
      const endTime = new Date(event.end.dateTime);
      const newEvent = new Event({
        title: event.subject,
        place: event.location.displayName,
        description: event.bodyPreview,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        userId: user._id,
      });
      newEvent.save();
    }

    // res.status(200).json(events.value);
  } catch (error) {
    console.error('The API returned an error: ' + error);
    // res.status(500).json({ error: 'Failed to fetch events'});
  }
}

module.exports = {
  sync_google_calendar,
  sync_microsoft_outlook,
};