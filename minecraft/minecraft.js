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
    const Energy_js = get_minecraft_response(minecraft_response,"Energy");
    const Max_energy_js = get_minecraft_response(minecraft_response,"Max_energy");
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


function get_minecraft_response(json,tag)
{
  console.log(typeof json)
  console.log(json);
  console.log(JSON.parse(json.toString()).Energy);
  
  let json_list = toString(json).split(",");

  for (json_entity of json_list){
        
    if (json_entity.split('"')[1] === tag){

        let regex = new RegExp(`"${tag}":(\\d+\\.?\\d*)`)
        let tag_value = json_entity.match(regex)[1];

        return tag_value;
    }
  }
  return "Incorrect_tag"
}

