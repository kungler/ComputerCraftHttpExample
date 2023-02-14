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
            
        });
    }
    else
    {
        req.on("data", chunk => {
        res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
        textTodisp = chunk.toString();
        res.end(textTodisp);
        console.log(textTodisp)
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
  console.log(Data)
  
  return Data.tag;
  
}