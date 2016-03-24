var express = require("express");
var app = express();


var http = require('http').Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");

app.use(express.static('./'));

const hostname = '0.0.0.0';
const port = 3000;


app.get("/", function(req,res){
	res.sendFile(__dirname + '/index.html');
	console.log("get launched")
});

io.on('connection', function(socket){
	console.log("socket ON")

  socket.on("keyTapLeft", function(){
	  	console.log("GOOOOOOO left")
		  robot.keyTap("left", "control");
  });

  socket.on("keyTapRight", function(){
	  	console.log("GOOOOOOO Right")
		  robot.keyTap("right", "control");
  });

});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});