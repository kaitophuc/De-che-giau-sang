const { google } = require('googleapis');
const { Client } = require('@microsoft/microsoft-graph-client');

const sync_google_calendar = async (req, res) => {
  console.log("User", req.user);
  const calendar = google.calendar({ version: 'v3', auth: req.user.googleAccessToken });

  const now = new Date();
  const sixMonthsAgo = new Date().setMonth(new Date().getMonth() - 6);

  calendar.events.list({
    calendarId: 'primary',
    timeMin: sixMonthsAgo.toISOString(),
    timeMax: now.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) {
      console.error('The API returned an error: ' + err);
      const events = res.data.items;
      console.log("Events from last 6 months", events);
    }
  })
}

const sync_outlook_calendar = async (req, res) => {
  const accessToken = req.user.microsoftAccessToken;

  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  const now = new Date();
  const sixMonthsAgo = new Date().setMonth(new Date().getMonth() - 6);

  try {
    const events = await client
      .api('/me/calendar/events')
      .filter(`start/dateTime ge '${sixMonthsAgo.toISOString()}' and end/dateTime le '${now.toISOString()}'`)
      .get();

    console.log("Events from last 6 months", events.value);
    res.status(200).json(events.value);
  } catch (error) {
    console.error('The API returned an error: ' + error);
    res.status(500).json({ error: 'Failed to fetch events'});
  }
}

module.exports = {
  sync_google_calendar,
  sync_outlook_calendar,
};