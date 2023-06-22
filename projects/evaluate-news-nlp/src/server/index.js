const dotenv = require('dotenv')
dotenv.config()
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var bodyParser = require('body-parser')
const fetch = require("node-fetch")

// Call api
var textapi = process.env.API_KEY
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    try {
        console.log('Example app listening on port 8080!')
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/add-url", async (req, res) => {
    try {
        userInput = req.body.url;
        const apiURL = `${baseURL}key=${textapi}&url=${userInput}&lang=en`;
        const response = await fetch(apiURL);
        const incomingData = await response.json();
        const sample = {
            text: incomingData.sentence_list[0].text,
            score_tag: incomingData.score_tag,
            agreement: incomingData.agreement,
            subjectivity: incomingData.subjectivity,
            confidence: incomingData.confidence,
            irony: incomingData.irony,
        };
        res.send(sample);
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)


    // const apiUrl = `${baseURL}${textapi}&of=json&txt=${req.query.text}`
    // fetch(apiUrl)
    // .then((response) => response.json())
    // .then((data) => {
    //     res.send(data)
    // })
    // .catch((error) => {
    //     console.log('Error:', error)
    //     res.status(500).send('Internal Server Error')
    // })
})

module.exports = app