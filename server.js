var express = require("express");
var app = express();
var os = require('os');
var BezierEasing = require('bezier-easing');

var http = require('http').Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");

var nbrCurrentPlayers = 0;
var timeClient;

// TEST TIME INTERNAL
function socketTime(tBefore){
	var tAfter = Date.now();
	var socketTime = tAfter - tBefore;
	console.log("socketTime = " + socketTime)
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
	// socket.on("timeClient", function(timeClient){
	// 	socketTime(timeClient)
	// });

	// PLAYER
	var idPlayer;

	if (nbrCurrentPlayers < 4){
		nbrCurrentPlayers++;
		idPlayer = nbrCurrentPlayers;
		console.log("Welcome Player " + idPlayer);
	}else{
		nbrCurrentPlayers = 0;
		nbrCurrentPlayers++;
		idPlayer = nbrCurrentPlayers;
		console.log("Welcome Player " + idPlayer);
	}

	// BUTTONS
	socket.on("butt", function(butt){

		// TODO: Fetch and instantiate the local keys ??
		// TODO: re-implement back (brake + stick down)
		// if (butt.val === "brake"){
		// 	if (butt.toggle === "pressed"){
		// 		robot.keyToggle(keys["brake"][idPlayer], "down");
		// 		robot.keyToggle(keys["down"][idPlayer], "down");
		// 	}else if (butt.toggle === "released"){
		// 		robot.keyToggle(keys["brake"][idPlayer], "up");
		// 		robot.keyToggle(keys["down"][idPlayer], "up");
		// 	return;
		// 	};
		// }else{


		//AZERTY (conversion to QWERTY) >> TODO: find a better way!
		if (butt.toggle === "pressed"){
			inputKey = keys[idPlayer][butt.val];
			robot.keyToggle(azertyToQwerty[inputKey], "down");
			// console.log("inputKey = " + inputKey);
			// convertedKey = azertyToQwerty[inputKey];
			// console.log("convertedKey = " + convertedKey);

			}else if (butt.toggle === "released"){
				inputKey = keys[idPlayer][butt.val];
				robot.keyToggle(azertyToQwerty[inputKey], "up");
					return
				};

	// QWERTY (No conversion)
			// if (butt.toggle === "pressed"){
			// 	robot.keyToggle(keys[idPlayer][butt.val], "down");
			// }else if (butt.toggle === "released"){
			// 	robot.keyToggle(keys[butt.val][idPlayer], "up");
			// };

		});


	// ROTATION
	var minAngle = 10;
	var maxAngle = 35;
	var timeChunk = 50;
	var currentOrientation = 0;
	var tBefore;
	var easing = BezierEasing(.50, 0, .50, 1);
	var roundDecimal = 1000


	socket.on("rowOrientation", function(rowOrientation){
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
	};


	function turnHandler(){

		setInterval(function() {
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
			inputRight = keys[idPlayer]["right"];
			robot.keyToggle(azertyToQwerty[inputRight], "down");
		}else{
			inputLeft = keys[idPlayer]["left"];
			robot.keyToggle(azertyToQwerty[inputLeft], "down");
		};
	};

	function turnKeyUp(){
		inputRight = keys[idPlayer]["right"];
		robot.keyToggle(azertyToQwerty[inputRight], "up")
		inputLeft = keys[idPlayer]["left"];
		robot.keyToggle(azertyToQwerty[inputLeft], "up")
	};

	turnHandler()

});



// TODO : test speed
// Hash Maps ?
var keys ={					// Controls
	1:{
		"right":		"a",	// DPad R
		"left":			"b",	// DPad L
		"down":			"c",	// DPad D
		"up":				"d",	// DPad U
		"start":		"e",	// Start
		"item":			"f",	// Z Trig
		"brake":		"g",	// B Button
		"go":				"h",	// A Button
		"display":	"i",	// C Button R
		"":					"",		// C Button L
		"":					"",		// C Button D
		"camera":		"j",	// C Button U
		"jump":			"k",	// R Trig
		"":					"",		// L Trig
		"25perCent":	"",
		"50perCent":	"",
		"75perCent":	""
	},
	2:{
		"right":		"a",	// DPad R
		"left":			"b",	// DPad L
		"down":			"c",	// DPad D
		"up":				"d",	// DPad U
		"start":		"e",	// Start
		"item":			"f",	// Z Trig
		"brake":		"g",	// B Button
		"go":				"h",	// A Button
		"display":	"i",	// C Button R
		"":					"",		// C Button L
		"":					"",		// C Button D
		"camera":		"j",	// C Button U
		"jump":			"k",	// R Trig
		"":					"",		// L Trig
		"25perCent":	"",
		"50perCent":	"",
		"75perCent":	""
	},
	3:{
		"right":		"a",	// DPad R
		"left":			"b",	// DPad L
		"down":			"c",	// DPad D
		"up":				"d",	// DPad U
		"start":		"e",	// Start
		"item":			"f",	// Z Trig
		"brake":		"g",	// B Button
		"go":				"h",	// A Button
		"display":	"i",	// C Button R
		"":					"",		// C Button L
		"":					"",		// C Button D
		"camera":		"j",	// C Button U
		"jump":			"k",	// R Trig
		"":					"",		// L Trig
		"25perCent":	"",
		"50perCent":	"",
		"75perCent":	""
	},
	4:{
		"right":		"a",	// DPad R
		"left":			"b",	// DPad L
		"down":			"c",	// DPad D
		"up":				"d",	// DPad U
		"start":		"e",	// Start
		"item":			"f",	// Z Trig
		"brake":		"g",	// B Button
		"go":				"h",	// A Button
		"display":	"i",	// C Button R
		"":					"",		// C Button L
		"":					"",		// C Button D
		"camera":		"j",	// C Button U
		"jump":			"k",	// R Trig
		"":					"",		// L Trig
		"25perCent":	"",
		"50perCent":	"",
		"75perCent":	""
	}
}

var azertyToQwerty = { //KeyNum
	"a":"q",	// 113
	"b":"b",	// 98
	"c":"c",	// 99
	"d":"d",	// 100
	"e":"e",	// 101
	"f":"f",	// 102
	"g":"g",	// 103
	"h":"h",	// 104
	"i":"i",	// 105
	"j":"j",	// 106
	"k":"k",	// 107
	"l":"l",	// 108
	"m":":",	// 109
	"n":"n",	// 110
	"o":"o",	// 111
	"p":"p",	// 112
	"q":"a",	// 97
	"r":"r",	// 114
	"s":"s",	// 115
	"t":"t",	// 116
	"u":"u",	// 117
	"v":"v",	// 118
	"w":"z",	// 122
	"x":"x",	// 120
	"y":"y",	// 121
	"z":"w",	// 119
	"0":"0",	// 48
	"1":"1",	// 49
	"2":"2",	// 50
	"3":"3",	// 51
	"4":"4",	// 52
	"5":"5",	// 53
	"6":"6",	// 54
	"7":"7",	// 55
	"8":"8",	// 56
	"9":"9",	// 57
}