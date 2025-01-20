var path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key
const API_KEY = "ff164c7b218c1c7abbc02ef91e3edab9";

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
});


// POST Route
app.post('/api', async (req, res) => {
    const text = req.body.text;
    try {
        // const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&of=json&txt=${text}&lang=en`);
        // const data = await response.json();
        // console.log(data);
        res.send({
            polarity: 'positive',
            subjectivity: 'objective',
            text: 'what ever',
        });
    } catch (error) {
        console.log("error", error);
    }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


