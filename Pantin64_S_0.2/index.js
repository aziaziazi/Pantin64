var app = require("express")();
var http = require('http').Server(app);
var io = require("socket.io")(http);
const hostname = '127.0.0.1';
const port = 3000;


app.get("/", function(req,res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log('message : ' + msg);
    io.emit('chat message', msg);
    console.log("emited ?")
  });
});

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});