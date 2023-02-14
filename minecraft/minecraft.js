const PORT = 1337;

const http = require("http");

http.createServer((req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    
    if(req.method == "POST")
    {
        req.on("data", chunk => {
            var minecraft_response = chunk.toString();
            res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
            res.end(minecraft_response);
            console.log(get_minecraft_response(minecraft_response,"Energy"))
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
  var incorrectJson = json;
  var correctJson = incorrectJson.replace(/([a-zA-Z]+)\s*=\s*/g, '"$1": ');
  console.log(correctJson)
  Data = JSON.parse(correctJson)
  console.log(document.write(Data.tag))
  console.log(correctJson)

  return document.write(Data.tag);
  
}