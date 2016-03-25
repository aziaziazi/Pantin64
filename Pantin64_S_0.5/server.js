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

	// return value of checkOrientLandPort
	socket.on("land", function(isTrue){
		console.log(isTrue)
	});

// Rturn
	socket.on("orientation", function(log){
		console.log(log);
	});


	// TOTO: Loop functions (?)
	// TODO: Use JSON (?)
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

	// TODO: implement press functions
	var y_up = function(){robot.keyToggle("y", "up")};
	var t_up = function(){robot.keyToggle("t", "up")};

	socket.on("dir", function(d){
		if (d=="l"){
			robot.keyToggle("y", "down");
			// setTimeout(y_up, 100);
		}else if (d=="r"){
			robot.keyToggle("t", "down")
			// setTimeout(t_up, 100);

		}
		else if (d=="x"){
			robot.keyToggle("y", "up")
			robot.keyToggle("t", "up")
		}
	});
});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});