var robot = require("robotjs");

const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  setTimeout(function(){
  	robot.setKeyboardDelay(1)
	  robot.keyTap("left", "control");
  	console.log("time ?")

  }, 1000);
  res.end('Hello World\n');

}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});