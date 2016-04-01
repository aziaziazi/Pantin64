var socket = io();

function RawOrientation(event){
  var beta = Math.round(event.beta);
  return {"beta":beta};
};

function initGamePad(){

  // ORIENTATION
  window.addEventListener("deviceorientation", function(e){
    //  TIME TEST
    tClient = Date.now();
    socket.emit("rowOrientation", RawOrientation(e));
    //  TIME TEST
    // socket.emit("tClient", tClient)

  });

  // BUTTONS
  // Bind together ?
    // TODO : Is touchend called twic ?
    // TODO : Keep (e) ?

  $('#go').bind("touchstart",     function(e){ tClient = Date.now(); socket.emit('butt', {"val":"go",      "toggle":"pressed"}) });
  $('#go').bind("touchend",       function(e){ tClient = Date.now(); socket.emit('butt', {"val":"go",      "toggle":"released"}) });
  $('#jump').bind("touchstart",   function(e){ tClient = Date.now(); socket.emit('butt', {"val":"jump",    "toggle":"pressed"}) });
  $('#jump').bind("touchend",     function(e){ tClient = Date.now(); socket.emit('butt', {"val":"jump",    "toggle":"released"}) });
  $('#item').bind("touchstart",   function(e){ tClient = Date.now(); socket.emit('butt', {"val":"item",    "toggle":"pressed"}) });
  $('#item').bind("touchend",     function(e){ tClient = Date.now(); socket.emit('butt', {"val":"item",    "toggle":"released"}) });
  $('#brake').bind("touchstart",  function(e){ tClient = Date.now(); socket.emit('butt', {"val":"brake",   "toggle":"pressed"}) });
  $('#brake').bind("touchend",    function(e){ tClient = Date.now(); socket.emit('butt', {"val":"brake",   "toggle":"released"}) });
  $('#start').bind("touchstart",  function(e){ tClient = Date.now(); socket.emit('butt', {"val":"start",   "toggle":"pressed"}) });
  $('#start').bind("touchend",    function(e){ tClient = Date.now(); socket.emit('butt', {"val":"start",   "toggle":"released"}) });
  $('#options').bind("touchstart",function(e){ tClient = Date.now(); socket.emit('butt', {"val":"options", "toggle":"pressed"}) });
  $('#options').bind("touchend",  function(e){ tClient = Date.now(); socket.emit('butt', {"val":"options", "toggle":"released"}) });

};