const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cron = require('node-cron');
require('./config/authJWT')
require('./config/authGoogle');

const connectDB = require('./database/connection');
const authenticate = require('./middlewares/authenticate');

const calendarRouter = require('./routes/calendar');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.use('/api/auth', authRouter);
app.use('/api/calendar', authenticate, calendarRouter);
app.use('/api/user', authenticate, userRouter);

app.get('/', (req, res) => {
    res.send('Schedura API');
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(5050, () => {
            console.log('Server is running on port 5050');
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();

cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task to sync calendars');

    try {
        const users = await User.find({});

        for (const user of users) {
            if (user.googleAccessToken) {
                sync_google_calendar(user, 'auto');
            }

            if (user.microsoftAccessToken) {
                sync_microsoft_outlook(user, 'auto');
            }
        }
    } catch (error) {
        console.error('Error syncing calendars:', error);
    }
});