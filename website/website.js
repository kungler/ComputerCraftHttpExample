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
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');
var bodyParser = require('body-parser');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const path = require('path');
var minecraft_port = 1337

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);

});












