const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1/contact-form';
const port = 4000;

const app = express();

mongoose.connect(url, {useNewUrlParser: true});

const con = mongoose.connection;

con.on('open', () => {
    console.log("Connected to Database");
})

app.use(cors()); 
app.use(express.json())

const contactInfoRouter = require('./routes/contactInfo');

app.use('/contactInfo', contactInfoRouter)

app.listen(port, () => {
    console.log(`The Server is running at port ${port}`);
})