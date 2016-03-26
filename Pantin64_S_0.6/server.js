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
		robot.keyToggle("u", "down");

	});
	socket.on("b_up", function(){
		robot.keyToggle("z", "up");
		robot.keyToggle("u", "up");
	});

	socket.on("rowRot", function(rowRot){
		// var r = Math.round(rowRot.gamma/5);

		var rotG = -Math.round(rowRot.beta)
		// Right
		if ((rotG > 7) && (rightDown == false)){
			turnRight();
		// Left
		}else if ((rotG < -7) && (leftDown == false)){
			turnLeft();
		}
		// Stop if right or left
		else if ((rotG > -7) && (rotG < 7) && ((rightDown || leftDown) == true)){
			stopTurning();
		}
	});

});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

const lapBetweenTurns = 0.1 //ms

var turnTime = 0
var a = 2

var easeIOQ = {
	"1":0.03571428571,
	"2":0.1785714286,
	"3":0.5,
	"4":0.7142857143,
	"5":0.8214285714,
}

// function easeInOutQuad(t){
// 	EaseInOut Function http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
//   turnTime = t<.5 ? 2*t*t : -1+(4-2*t)*t
// 	console.log (t);
// 	console.log (turnTime);
// }

var turningRot = 0;

// function chooseTurn(r){
// 	if (r != turningRot){
// 		if (r>0){
// 			turnRight(r)
// 		}else if (r<0){
// 			turnLeft(r)
// 		}
// 	turningRot = r;
// 	}
// }


// function turnRight(r){
// 	if (r<6){
// 		step = (easeIOQ[-r])*1000
// 		// console.log(step)
// 		slowTurnR(step)
// 	} else {
// 		// tightTurnR()
// 	}
// }

// function slowTurnR(r){
// 		robot.keyToggle("y", "down");
// 		setTimeout(function(){
// 			robot.keyToggle("y", "up");
// 		}, step);
// 		turnRight(r);
// }
function turnRight(){
	robot.keyToggle("y", "down");
	rightDown = true
}

function turnLeft(){
	robot.keyToggle("t", "down");
	leftDown = true
}

rightDown = false;
leftDown = false;

function stopTurning(){
	rightDown = false;
	leftDown = false;
	console.log("Stop Turning")
	robot.keyToggle("y", "up");
	robot.keyToggle("t", "up");
}