const { google } = require('googleapis');

const sync_google_calendar = async (req, res) => {
  // const auth = new google.auth.OAuth2(
  //   process.env.GOOGLE_CLIENT_ID,
  //   process.env.GOOGLE_CLIENT_SECRET,
  //   'http://localhost:5173/',
  // )
  // auth.setCredentials({
  //   access_token: req.user.googleAccessToken,
  //   refresh_token: req.user.googleRefreshToken,
  // })

  console.log("User", req.user);
  const calendar = google.calendar({ version: 'v3', auth: req.user.googleAccessToken });

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
      const events = res.data.items;
      console.log("Events from last 6 months", events);
    }
  })
}

module.exports = {
  sync_google_calendar,
};