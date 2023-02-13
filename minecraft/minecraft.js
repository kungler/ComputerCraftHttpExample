const PORT = 1337;

const http = require("http");

http.createServer((req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    
    if(req.method == "POST")
    {
        let textToSend = "unknown";
        req.on("data", chunk => {
            let num = parseInt(chunk.toString());
            
        
            textToSend = get_value();
            res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
            res.end(textToSend);
            var minecraft_response = res.end(textToSend);
        });
    }
    else
    {
        res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
        textToSend = get_value();
        res.end(textToSend);
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
function get_value(num)
{
    let value = num
    return value;
}
