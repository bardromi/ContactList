/**
 * Created by Bar on 8/2/2017.
 */

//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const route = require('./route/route');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017')
});

//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in Database connection:' + err)
    }
});

//port number
const port = 3000;

//adding middleware
app.use(cors());

//body - parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

//testing ser;ver
app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, () => {
    console.log('Server started at port"' + port);
});