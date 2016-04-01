var express = require("express");
var app = express();
var os = require('os');
var BezierEasing = require('bezier-easing');

var http = require('http').Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");

var nbrCurrentPlayers = 0;




// TEST TIME INTERNAL
function testTime(tBefore){
		var tAfter = Date.now();
		var testTime = tAfter - tBefore;
		console.log(">>> testTime = " + testTime)
}





function getNetworkIp(){
	var interfaces = os.networkInterfaces();
	var addresses = [];
	for (var k in interfaces) {
	    for (var k2 in interfaces[k]) {
	        var address = interfaces[k][k2];
	        if (address.family === 'IPv4' && !address.internal) {
	            addresses.push(address.address);
	        };
	    };
	};
return addresses;
};





app.use(express.static('./'));

const hostname = '0.0.0.0';
const port = 3000;

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('Connect your client to ' + getNetworkIp() +":"+ port)
});

  app.get("/", function(req,res){
  	res.sendFile(__dirname + '/index.html');
  });


io.on('connection', function(socket){
		// TEST SOCKET TIME
	socket.on("tClient", function(tClient){
		testTime(tClient)
	});



	// PLAYER
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
		if (butt.toggle === "pressed"){
			robot.keyToggle(keys[butt.val][idPlayer], "down");
		}else if (butt.toggle === "released"){
			robot.keyToggle(keys[butt.val][idPlayer], "up");
		};
	});





	// ROTATION
	var minAngle = 5;
	var maxAngle = 45;
	var timeChunk = 5;
	var currentOrientation = 0;
  var tBefore;
	var easing = BezierEasing(.50, 0, .70, 1);
	var roundDecimal = 1000
	// var easing = BezierEasing(.60, 0, .40, 1);


	socket.on("rowOrientation", function(rowOrientation){
		tBefore = Date.now();

		currentOrientation = convertAngle(rowOrientation.beta);


	});

	function convertAngle(rowOrientation){

		positOrient = Math.abs(rowOrientation)
		if (positOrient < minAngle){
			return 0
		}

		else if ( positOrient >= minAngle && positOrient <= maxAngle ){
			if (rowOrientation>0){// POSITIVE
				convertedOrientation = Math.round(positOrient-minAngle)/(maxAngle-minAngle) // Range minAngle > maxAngle
				return Math.round(easing(convertedOrientation)*roundDecimal)/roundDecimal	// easing
			}else{								// NEGATIVE
				convertedOrientation = Math.round(positOrient-minAngle)/(maxAngle-minAngle)
				return Math.round(easing(convertedOrientation)*roundDecimal)/roundDecimal*(-1)
			}
		}else if(rowOrientation>maxAngle){
			return 1
		}else{
			return -1
		};

	}


function turnHandler(){

	setInterval(function() {
		console.log(currentOrientation)
		if (currentOrientation == 0){
			turnKeyUp()			// This is necessary only in the case of a currentOrientation going 0 just after a turnKeyDown()
											// because it doesn't automatically call a turnKeyUp(). It's very likely that the relativeTurn (else statement)
											// will be call between. But not impossible...
		}else if (currentOrientation == 1 || currentOrientation == -1){
			turnKeyDown()
		}else{
			turnKeyDown()
			setTimeout(function() {
				turnKeyUp()
			}, currentOrientation*timeChunk);
		}
	},timeChunk)
};


function turnKeyDown(){
	if (currentOrientation < 0){
		robot.keyToggle(keys["right"][idPlayer], "down");
	}
	else{
		robot.keyToggle(keys["left"][idPlayer], "down");
	};
};

function turnKeyUp(){
	robot.keyToggle(keys["left"][idPlayer], "up");
	robot.keyToggle(keys["right"][idPlayer], "up");
};

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
};