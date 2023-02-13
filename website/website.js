// A webapp for taking http requests and replying with a JSON response
// Create all functions for getting POST data, and sending JSON response
// Create a server that listens on port 8080
// Create a route for the server to listen on for POST requests
// Create a route for the server to listen on for GET requests
// Render the index.html file when a GET request is made to the server

// server.js
// where your node app starts

// define process env port
process.env.PORT = 8080;

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('website'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST method route
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  let chart = {
    id:req.body.id,
    firstname:req.body.firstname,
}
console.log(chart)

  res.send('welcome, ' + req.body.name)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function get_minecraft_response(tag)
{
  var incorrectJson = minecraft_response;
  var correctJson = incorrectJson.replace(/([a-zA-Z]+)\s*=\s*/g, '"$1": ');
  console.log(correctJson)
  Data = JSON.parse(correctJson)
  console.log(Data.tag)

  return document.write(Data.tag);
  
}