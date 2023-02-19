const PORT = 1337;

const http = require("http");

var express = require('express');
var app = express();
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




http.createServer((req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    
    if(req.method == "POST")
    {
        req.on("data", chunk => {
            var minecraft_response = chunk.toString();
            res.writeHead(200, {"Content-Type": "application/json; UTF-8"});
            res.end(minecraft_response);

            var Energy_js = get_minecraft_response(minecraft_response,"Energy");
            var Max_energy_js = get_minecraft_response(minecraft_response,"Max_energy");
            eventEmitter.emit('minecraft_var',{Energy_js,Max_energy_js});




        });
    }
}).listen(PORT, null, (err) => {
    if(err)
        console.error(`Error: ${err}`);
    else
        console.log("\n\nServer is listening...");
        
        console.log(`Serveur en écoute sur le port ${minecraft_port}.`);
        app.get('/home/vincentgenty33/erp-atm7-V1/minecraft/minecraft.js', function (request, response) {
            const data = {Energy_js,Max_energy_js};
            response.json(data);
          });
        
        // Récupérer les variables en utilisant Axios
        axios.get('http://34.163.212.35:1337' + '/home/vincentgenty33/erp-atm7-V1/minecraft/minecraft.js')
            .then(response => {
            Energy_js = response.data.Energy_js;
            Max_energy_js = response.data.Max_energy_js;
            })
            .catch(error => {
            console.error(error);
            });
        
            setInterval(() => {
            axios.get('http://34.163.212.35:1337' + '/home/vincentgenty33/erp-atm7-V1/minecraft/minecraft.js')
                .then(response => {
                console.log(Energy_js);
                console.log(Max_energy_js);
                Energy_js = response.data.Energy_js;
                Max_energy_js = response.data.Max_energy_js;
                console.log(Energy_js);
                console.log(Max_energy_js);
                })
                .catch(error => {
                console.error(error);
                });
            }, 5000);
        });



function get_minecraft_response(json,tag)
{

  let json_list = json.split(",");

  for (json_entity of json_list){
        
    if (json_entity.split('"')[1] === tag){

        let regex = new RegExp(`"${tag}":(\\d+\\.?\\d*)`)
        let tag_value = json_entity.match(regex)[1];

        return tag_value;
    }
  }
  return "Incorrect_tag"
}

