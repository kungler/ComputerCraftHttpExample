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
const minecraft_port = 8080;

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

//variables à récuperer
let Energy_js;
let Max_energy_js;

eventEmitter.on('minecraft_var', (data) => {
  Energy_js = data.Energy_js;
  Max_energy_js = data.Max_energy_js;
});


app.use(express.static('website'));

app.get("minecraft/minecraft.js", function (request, response) {
  const data = {Energy_js,Max_energy_js};
  response.json(data);

http.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}.`);

  // Récupérer les variables en utilisant Axios
  axios.get('http://localhost:1337/minecraft_variables')
    .then(response => {
      Energy_js = response.data.Energy_js;
      Max_energy_js = response.data.Max_energy_js;
    })
    .catch(error => {
      console.error(error);
    });

    setInterval(() => {
      axios.get('http://localhost:1337/minecraft_variables')
        .then(response => {
          variable1 = response.data.Energy_js;
          variable2 = response.data.Max_energy_js;
        })
        .catch(error => {
          console.error(error);
        });
    }, 5000);
  }); }, 5000);



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



