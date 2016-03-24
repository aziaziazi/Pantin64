var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");

const hostname = '0.0.0.0';
const port = 3000;


app.get("/", function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on("keyTapLeft", function(){
	  	console.log("GOOOOOOO")
		  // robot.keyTap("left", "control");
  });

});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});