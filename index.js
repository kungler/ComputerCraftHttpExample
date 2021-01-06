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
                textToSend = factorial(num).toString();


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
 * From https://stackoverflow.com/a/3959361/8602926
 * @param {Number} num
 */
function factorial(num)
{
    let rval = 1;
    for(let i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}