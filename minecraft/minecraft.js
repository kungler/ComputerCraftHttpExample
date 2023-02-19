const PORT = 1337;

const http = require("http");

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

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
})



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

