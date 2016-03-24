var express = require("express");
var app = express();


var http = require('http').Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");
var keyMap = require('./keyMap.json');


app.use(express.static('./'));

const hostname = '0.0.0.0';
const port = 3000;

app.get("/", function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log("socket ON")

 //  socket.on(keyMap["A button"].domId, function(){
	//   	// console.log(keyMap["A button"].Action)
	// 	  // robot.keyTap(keyMap["A button"].computerKey.p1);
	// 	  robot.keyToggle("a", "down");
 //  });
 //  socket.on(keyMap["B button"].domId, function(){
	//   	// console.log(keyMap["B button"].Action)
	// 	  // robot.keyTap(keyMap["B button"].computerKey.p1);
	// 	  robot.keyTap("z");
 //  });
 //  socket.on(keyMap["R button"].domId, function(){
	//   	// console.log(keyMap["R button"].Action)
	// 	  // robot.keyTap(keyMap["R button"].computerKey.p1);
	// 	  robot.keyTap("e");
 //  });
 //  socket.on(keyMap["Z button"].domId, function(){
	//   	// console.log(keyMap["Z button"].Action)
	// 	  // robot.keyTap(keyMap["Z button"].computerKey.p1);
	// 	  robot.keyTap("r");
	// });


  socket.on("j_do", function(){
	  robot.keyToggle("e", "down");
	});
  socket.on("j_up", function(){
	  robot.keyToggle("e", "up");
	});

	  socket.on("g_do", function(){
	  robot.keyToggle("a", "down");
	});
  socket.on("g_up", function(){
	  robot.keyToggle("a", "up");
	});

	  socket.on("f_do", function(){
	  robot.keyToggle("r", "down");
	});
  socket.on("f_up", function(){
	  robot.keyToggle("r", "up");
	});

	  socket.on("b_do", function(){
	  robot.keyToggle("z", "down");
	});
  socket.on("b_up", function(){
	  robot.keyToggle("z", "up");
	});

});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});