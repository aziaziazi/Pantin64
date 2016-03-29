var socket = io();

function RawOrientation(event){
  var beta = event.beta;
  return {"beta":beta}
};


function initGamePad(){

  window.addEventListener("deviceorientation", function(e){
    socket.emit("rowOrientation", RawOrientation(e));
  });

  document.getElementById('jump').addEventListener("touchstart", function(e){ socket.emit('butt', {"val":"jump", "toggle":"pressed" }); }, false);
  document.getElementById('jump').addEventListener("touchend",   function(e){ socket.emit('butt', {"val":"jump", "toggle":"up"}); }, false);

  document.getElementById('go').addEventListener("touchstart",   function(e){ socket.emit('butt', {"val":"go", "toggle":"pressed" }); }, false);
  document.getElementById('go').addEventListener("touchend",     function(e){ socket.emit('butt', {"val":"go", "toggle":"released"}); }, false);

  document.getElementById('item').addEventListener("touchstart", function(e){ socket.emit('butt', {"val":"item", "toggle":"pressed" }); }, false);
  document.getElementById('item').addEventListener("touchend",   function(e){ socket.emit('butt', {"val":"item", "toggle":"released"}); }, false);

  document.getElementById('brake').addEventListener("touchstart",function(e){ socket.emit('butt', {"val":"brake", "toggle":"pressed" }); }, false);
  document.getElementById('brake').addEventListener("touchend",  function(e){ socket.emit('butt', {"val":"brake", "toggle":"released"}); }, false);

  document.getElementById('start').addEventListener("touchstart",function(e){ socket.emit('butt', {"val":"start", "toggle":"pressed"}); }, false);
  document.getElementById('start').addEventListener("touchend",  function(e){ socket.emit('butt', {"val":"start", "toggle":"released"}); }, false);

  // document.getElementById('options').addEventListener("touchstart",function(e){ socket.emit('butt', {"val":"brake", "toggle":"down" }); }, false);
  // document.getElementById('options').addEventListener("touchend",  function(e){ socket.emit('butt', {"val":"brake", "toggle":"released"}); }, false);


};