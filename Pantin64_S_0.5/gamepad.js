var socket = io();

function initGamePad(){

  var but_j = document.getElementById('j')
  var but_g = document.getElementById('g')
  var but_f = document.getElementById('f')
  var but_b = document.getElementById('b')

  but_j.addEventListener("touchstart", function(e){
    socket.emit('j_do');
  }, false);
  but_j.addEventListener("touchend", function(e){
    socket.emit('j_up');
  }, false);

  but_g.addEventListener("touchstart", function(e){
    socket.emit('g_do');
  }, false);
  but_g.addEventListener("touchend", function(e){
    socket.emit('g_up');
  }, false);

  but_f.addEventListener("touchstart", function(e){
    socket.emit('f_do');
  }, false);
  but_f.addEventListener("touchend", function(e){
    socket.emit('f_up');
  }, false);

  but_b.addEventListener("touchstart", function(e){
    socket.emit('b_do');
  }, false);
  but_b.addEventListener("touchend", function(e){
    socket.emit('b_up');
  }, false);

};