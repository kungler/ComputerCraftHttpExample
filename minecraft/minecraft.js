const PORT = 1337;

const http = require("http");
var express = require('express');
var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require('axios');
var bodyParser = require('body-parser');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();
const path = require('path');
var minecraft_port = 1337


//variables à récuperer

let Energy_js;
let Max_energy_js;

eventEmitter.on('minecraft_var', (data) => {
  Energy_js = data.Energy_js;
  Max_energy_js = data.Max_energy_js;
});


app.use(express.static('website'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/', (req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    const minecraft_response = req.body;
    const mr_string = JSON.stringify(minecraft_response);
    const mr_parse = JSON.parse(mr_string);
    Energy_js = get_minecraft_response(mr_parse,"Energy");
    Max_energy_js = get_minecraft_response(mr_parse,"Max_energy");
    eventEmitter.emit('minecraft_var',{Energy_js,Max_energy_js});
    const data = {Energy_js,Max_energy_js};
    res.json(data);
  });
  
  io.on('connection', (socket) => {
    socket.emit('minecraft_var', {Energy_js, Max_energy_js});
  });
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });

function get_minecraft_response(jsonStr,tag){
    console.log(jsonStr)
    let regex = new RegExp(`"${tag}":\\s*([^,}\\s]*)`, 'i');
    console.log(regex)
    let match = JSON.stringify(jsonStr).match(regex);
    if (match) {
      return parseFloat(match[1]);
    } else {
      return null;
    }

     
  }
  
  




