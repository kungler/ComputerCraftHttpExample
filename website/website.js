const http = require('http');
const fs = require('fs');
const port = 8080;

const requestHandler = (request, response) => {

if (request.url === '/index.html') {
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end('Error loading index.html');
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    }
  });

} else {

fs.readFile('./stylesheet.css', (err, data) => {
  if (err) {
    console.error('Error loading style.css');
  } else {
    const css = data.toString();
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.end(css);
  }
})

}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('Error starting server: ', err);
  }

  console.log(`Server is listening on ${port}`);
})};
