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
  response.sendFile(path.join(__dirname, 'public', 'minecraft.js'))
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);

});


//API_minecraft


//variables à récuperer

let Energy_js;
let Max_energy_js;

eventEmitter.on('minecraft_var', (data) => {
  Energy_js = data.Energy_js;
  Max_energy_js = data.Max_energy_js;
});


app.use(express.static('website'));

app.get(path.join(__dirname, 'minecraft', 'minecraft.js'), function (request, response) {
  const data = {Energy_js,Max_energy_js};
  response.json(data);
});

http.listen(minecraft_port, () => {
  console.log(`Serveur en écoute sur le port ${minecraft_port}.`);

  // Récupérer les variables en utilisant Axios
  axios.get('http://34.163.212.35:1337/ ' + path.join(__dirname, 'minecraft', 'minecraft.js'))
    .then(response => {
      Energy_js = response.data.Energy_js;
      Max_energy_js = response.data.Max_energy_js;
    })
    .catch(error => {
      console.error(error);
    });

    setInterval(() => {
      axios.get('http://34.163.212.35:1337/ ' + path.join(__dirname, 'minecraft', 'minecraft.js'))
        .then(response => {
          Energy_js = response.data.Energy_js;
          Max_energy_js = response.data.Max_energy_js;
        })
        .catch(error => {
          console.error(error);
        });
    }, 5000);
  });






