// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// GET route that returns the projectData object
app.get('/all', getProjectData);

function getProjectData(req, res){
  res.send(projectData);
};

// POST route that adds incoming data to projectData
app.post('/addData', addData);
function addData(req, res) {
    let newData = {
      name: req.body.name,
      temp: req.body.temp,
      date: req.body.date,
      content: req.body.content
    }
    // projectData.push(newData);
    projectData = newData;
    res.send(projectData);
}