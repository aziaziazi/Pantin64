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

	socket.on("rowRot", function(rowRot){
		var rot = convertRot(rowRot).gamma
		// Right
		if ((rot > 7) && (rightDown == false)){
			turnRight();
		// Left
		}else if ((rot < -7) && (leftDown == false)){
			turnLeft();
		}
		// Stop if right or left
		else if ((rot > -7) && (rot < 7) && ((rightDown || leftDown) == true)){
			stopTurning();
		}
	});

});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

  function convertRot(rowRot){
  	var rot = {"beta" : Math.round(rowRot.beta),
  	"gamma" : Math.round(rowRot.gamma)
  }
  return rot
}

var rightDown = false;
var leftDown = false

function turnRight(){
	rightDown = true;
	robot.keyToggle("y", "down");
}

function turnLeft(){
	leftDown = true;
	// console.log("Start pressing Left");
	robot.keyToggle("t", "down");
}

function stopTurning(){
	rightDown = false;
	leftDown = false;
	// console.log("Stop pressing")
	robot.keyToggle("y", "up");
	robot.keyToggle("t", "up");
}