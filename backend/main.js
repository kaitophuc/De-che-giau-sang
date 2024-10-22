const express = require('express');
const cors = require('cors');
const router = require('./routes/calendar');
const connectDB = require('./database/connection');

const app = express();
app.use(cors());

app.use('/api/calendar', router);

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