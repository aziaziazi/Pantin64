var socket = io();

function initGamePad(){
  $('#l').click(function(){
    socket.emit('keyTapLeft');
    return false; // Keep ? Was in exemple http://socket.io/get-started/chat/
  });

  $('#r').click(function(){
    socket.emit('keyTapRight');
    return false; // Keep ? Was in exemple http://socket.io/get-started/chat/
  });
};