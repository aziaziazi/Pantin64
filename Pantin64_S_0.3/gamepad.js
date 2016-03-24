var socket = io();

var initGamePad = function(){

  $('.controler').click(function(){
    socket.emit('keyTapLeft');
    return false; // Keep ? Was in exemple http://socket.io/get-started/chat/
  });

};