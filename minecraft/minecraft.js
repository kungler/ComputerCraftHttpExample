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
    console.log(minecraft_response)
    const Energy_js = get_minecraft_response(JSON.stringify(minecraft_response),"\"Energy\"");
    const Max_energy_js = get_minecraft_response(JSON.stringify(minecraft_response),"\"Max_energy\"");
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
    const regex = new RegExp(`"${tag}":([^,}]+)`);
    console.log(regex)
    let match = jsonStr.match(regex);
    console.log(match)
    if (!match) {
      // Si le tag n'est pas trouvé dans le JSON restant, retourner null
      console.log('wesh')
      return null;
    }
    // Extraire la valeur de la clé vide (clé vide = chaîne JSON restante)
    const emptyKey = Object.keys(JSON.parse(`{${jsonStr}}`))[0];
    const remainingJsonStr = `{${jsonStr}}`[emptyKey];
    console.log(remainingJsonStr)
    // Appliquer la recherche de chaîne de caractères sur la chaîne JSON restante
    match = remainingJsonStr.match(regex);
    if (!match) {
      // Si le tag n'est pas trouvé dans la chaîne JSON restante, retourner null
      return null;
    }
    return match[1].trim();
  }
  
  




