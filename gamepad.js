var socket = io();

function RawOrientation(event){
  var beta = Math.round(event.beta);
  return {"beta":beta};
};


function initGamePad(){

  // ORIENTATION
  window.addEventListener("deviceorientation", function(e){
    //  TIME TEST
    timeClient = Date.now();
    socket.emit("rowOrientation", RawOrientation(e));
    //  TIME TEST
    // socket.emit("timeClient", timeClient)

  });

  // BUTTONS
  // Bind together ?
    // TODO : Is touchend called twic ?
    // TODO : Keep (e) ?

  $('#go').bind("touchstart",     function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"go",      "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#go').bind("touchend",       function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"go",      "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });
  $('#jump').bind("touchstart",   function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"jump",    "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#jump').bind("touchend",     function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"jump",    "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });
  $('#item').bind("touchstart",   function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"item",    "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#item').bind("touchend",     function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"item",    "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });
  $('#brake').bind("touchstart",  function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"brake",   "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#brake').bind("touchend",    function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"brake",   "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });
  $('#start').bind("touchstart",  function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"start",   "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#start').bind("touchend",    function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"start",   "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });
  $('#up').bind("touchstart",     function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"up", "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#up').bind("touchend",       function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"up", "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });
  $('#down').bind("touchstart",   function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"down", "toggle":"pressed"});
    // socket.emit("timeClient", timeClient)
  });
  $('#down').bind("touchend",     function(e){ timeClient = Date.now(); socket.emit('butt', {"val":"down", "toggle":"released"});
    // socket.emit("timeClient", timeClient)
  });


};
