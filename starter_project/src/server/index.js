var path = require('path');
const axios = require('axios');
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
    try {

        const url = req.body.url;
        const response = await axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&of=json&url=${url}&lang=en`);
        const { status } = response;
        if (status.msg !== 'OK') {
            return res.send({ ok: false, error: 'Could not access sentiment API' });
        }

        const { subjectivity, agreement, sentence_list } = response.data;
        res.send({
            ok: true,
            data: {
                polarity: agreement,
                subjectivity,
                snippet: sentence_list[0].text,
            }
        });
    } catch (error) {
        res.send({ ok: false, error: error.message });
    }
});

// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


