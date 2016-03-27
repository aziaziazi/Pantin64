var socket = io();

function RawOrientation(event){
  var beta = event.beta;
  return {"beta":beta}
};

function initGamePad(){

  window.addEventListener("deviceorientation", function(e){
    socket.emit("rowOrientation", RawOrientation(e));
  });

  document.getElementById('jump').addEventListener("touchstart", function(e){ socket.emit('butt', {"val":"jump", "toggle":"down" }); }, false);
  document.getElementById('jump').addEventListener("touchend",   function(e){ socket.emit('butt', {"val":"jump", "toggle":"up"}); }, false);

  document.getElementById('go').addEventListener("touchstart",   function(e){ socket.emit('butt', {"val":"go", "toggle":"down" }); }, false);
  document.getElementById('go').addEventListener("touchend",     function(e){ socket.emit('butt', {"val":"go", "toggle":"released"}); }, false);

  document.getElementById('item').addEventListener("touchstart", function(e){ socket.emit('butt', {"val":"item", "toggle":"down" }); }, false);
  document.getElementById('item').addEventListener("touchend",   function(e){ socket.emit('butt', {"val":"item", "toggle":"released"}); }, false);

  document.getElementById('brake').addEventListener("touchstart",function(e){ socket.emit('butt', {"val":"brake", "toggle":"down" }); }, false);
  document.getElementById('brake').addEventListener("touchend",  function(e){ socket.emit('butt', {"val":"brake", "toggle":"released"}); }, false);

  document.getElementById('start').addEventListener("touchstart",function(e){ socket.emit('butt', {"val":"brake", "toggle":"down" }); }, false);
  document.getElementById('start').addEventListener("touchend",  function(e){ socket.emit('butt', {"val":"brake", "toggle":"released"}); }, false);

  document.getElementById('options').addEventListener("touchstart",function(e){ socket.emit('butt', {"val":"brake", "toggle":"down" }); }, false);
  document.getElementById('options').addEventListener("touchend",  function(e){ socket.emit('butt', {"val":"brake", "toggle":"released"}); }, false);


};