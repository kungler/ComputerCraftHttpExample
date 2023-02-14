const PORT = 1337;

const http = require("http");

http.createServer((req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    
    if(req.method == "POST")
    {
        req.on("data", chunk => {
            var minecraft_response = chunk.toString();
            res.writeHead(200, {"Content-Type": "application/json; UTF-8"});
            res.end(minecraft_response);
            console.log(get_minecraft_response(minecraft_response,"Energy"))
        });
    }
})
.listen(PORT, null, (err) => {
    if(err)
        console.error(`Error: ${err}`);
    else
        console.log("\n\nServer is listening...");
});



function get_minecraft_response(json,tag)
{

  
  Data = JSON.parse(json);
  let json_list = json.split(",");
  console.log(json_list);
  console.log(Data.split(","));
  


  return Data.tag;
  
}