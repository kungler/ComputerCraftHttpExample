const PORT = 1337;

const http = require("http");

http.createServer((req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    
    if(req.method == "POST")
    {
        let textToSend = "unknown";
        req.on("data", chunk => {
            let minecraft_response = chunk.toString();
            res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
            res.end(minecraft_response);
        });
    }
    else
    {
        res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
        textTodisp = chunk.toString();
        res.end(textTodisp);
    }
})
.listen(PORT, null, (err) => {
    if(err)
        console.error(`Error: ${err}`);
    else
        console.log("\n\nServer is listening...");
});



/**
 * @param {Number} num
 */
