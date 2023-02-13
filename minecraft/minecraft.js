const PORT = 1337;

const http = require("http");

http.createServer((req, res) => {
    console.log(`Incoming ${req.method} from ${req.connection.remoteAddress}`);
    
    if(req.method == "POST")
    {
        req.on("data", chunk => {
            let num = parseInt(chunk.toString());
            let textToSend = "unknown";

            if(isNaN(num))
                textToSend = Buffer.from(chunk.toString()).toString("base64");
            else
                textToSend = test().toString();


            res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
            res.end(textToSend);
        });
    }
    else
    {
        res.writeHead(200, {"Content-Type": "text/plain; UTF-8"});
        res.end(new Date().toString());
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
    value = num
    return value;
}
