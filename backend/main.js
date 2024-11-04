const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');

const calendarRouter = require('./routes/calendar');
const authRouter = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/calendar', calendarRouter);
app.use('/api/auth', authRouter);

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