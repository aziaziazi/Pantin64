var express = require("express");
var app = express();


var http = require('http').Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");

var nbrCurrentPlayers = 0;



app.use(express.static('./'));

const hostname = '0.0.0.0';
const port = 3000;

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

  app.get("/", function(req,res){
  	res.sendFile(__dirname + '/index.html');
  });


// speed : date.time


// PLAYER CODE

io.on('connection', function(socket){

	var idPlayer;

	if (nbrCurrentPlayers < 4){
		nbrCurrentPlayers++;
		idPlayer = nbrCurrentPlayers;
		console.log("Welcome Player " + idPlayer)
	}else{
		nbrCurrentPlayers = 0
		nbrCurrentPlayers++;
		idPlayer = nbrCurrentPlayers;
		console.log("Welcome Player " + idPlayer)
	}

	// BUTTONS

	// TODO: re-implement back (brake + stick down)
	// Fetch and instantiate the local keys ??
	socket.on("butt", function(butt){
		if (butt.toggle == "pressed"){												//TRY Binari data
			robot.keyToggle(keys[butt.val][idPlayer], "down");
		}else{
			robot.keyToggle(keys[butt.val][idPlayer], "up");
		}
	});



	// ROTATION
	var minAngle = 10;
	var maxAngle = 30;
	var timeChunk = 5;
	var currentOrientation = 0;
	var decimalRound = 10

	socket.on("rowOrientation", function(rowOrientation){
		currentOrientation = convertAngle(rowOrientation.beta)
	});

	function convertAngle(rowOrientation){									//TRY Math on device (at least round)
		positOrient = Math.abs(rowOrientation)
		if (positOrient < minAngle){
			return 0
		}

		// MAKE BETTER ??
		// Positive
		else if (positOrient > minAngle && positOrient < maxAngle && rowOrientation>0) {
			return Math.round(rowOrientation-minAngle)/(maxAngle-minAngle)

		// Negative
	}else if (positOrient > minAngle && positOrient < maxAngle && rowOrientation<0) {
		return Math.round(rowOrientation+minAngle)/(maxAngle-minAngle)

	}else if(rowOrientation>maxAngle){
		return 1
	}else{
		return -1
	};
}


function turnHandler(){
	setInterval(function() {
		if (currentOrientation == 0){
			turnKeyUp()			// This is necessary only in the case of a currentOrientation going 0 just after a turnKeyDown()
											// because it doesn't automatically call a turnKeyUp(). It's very likely that the relativeTurn (else statement)
											// will be call between. But not impossible...
		}else if (currentOrientation == 1 || currentOrientation == -1){ // Group ?
			turnKeyDown()
		}else{
			setTimeout(function() {
				turnKeyDown()
				setTimeout(function() {
					turnKeyUp()
				}, currentOrientation*timeChunk);
			}, timeChunk);
		}
	},0)
};


function turnKeyDown(){
	if (currentOrientation < 0){
		robot.keyToggle(keys["right"][idPlayer], "down");
	}
	else{
		robot.keyToggle(keys["left"][idPlayer], "down");
	}
};

function turnKeyUp(){
	robot.keyToggle(keys["left"][idPlayer], "up");
	robot.keyToggle(keys["right"][idPlayer], "up");
}

turnHandler()

});

// Hash Maps ?

var keys = {
	"jump":{ 	// R
		"1":"1",
		"2":"a",
		"3":"q",
		"4":"w"
	},
	"go":{		// A
		"1":"2",
		"2":"z",
		"3":"s",
		"4":"x"
	},
	"item":{	// Z
		"1":"3",
		"2":"e",
		"3":"d",
		"4":"c"
	},
	"brake":{	// B
		"1":"4",
		"2":"r",
		"3":"f",
		"4":"v"
	},
	"left":{	// Stick Left
		"1":"5",
		"2":"t",
		"3":"g",
		"4":"b"
	},
	"right":{ // Stick Right
		"1":"6",
		"2":"y",
		"3":"h",
		"4":"n"
	},
	"downArrow":{// Stick Down
		"1":"7",
		"2":"u",
		"3":"j",
		"4":","
	},
	"start":{	// Start
		"1":"8",
		"2":"i",
		"3":"k",
		"4":";"
	},
	"camPos":{ // C up
		"1":"9",
		"2":"o",
		"3":"l",
		"4":":"
	},
	"display":{ // C right
		"1":"0",
		"2":"p",
		"3":"m",
		"4":"="
	},
	"musicVol":{ // L button. On Game select, choose options
		"1":">",
		"1":">",
		"1":">",
		"1":">"
	},
}
