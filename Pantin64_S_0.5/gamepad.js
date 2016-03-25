var socket = io();

// true = Landscape
// false = portrait
// var land

// function checkOr(){
//     if(window.innerHeight > window.innerWidth){
//       land = false;
//       socket.emit("land", land)
//     }else{
//       land = true;
//       socket.emit("land", land)
//     };
// };


// function getRawOrientation(event){
//   var beta = event.beta;
//   var gamma = event.gamma;
//   return {"beta":beta,
//           "gamma":gamma}
// };

function initGamePad(){

  // IMPLEMENT: check device compatibility

  // At orientation change, check new orientation
  // window.addEventListener("orientationchange", function(){
  //   checkOr()
  // });

  // // TODO: Optimise : is there a way not to check land each time ?
  // window.addEventListener("deviceorientation", function(e){
  //   if (land == true){
  //     var rowRot = -getRawOrientation(e).beta
  //   }else{
  //     var rowRot = getRawOrientation(e).gamma
  //   }

  //   // TODO:update rowrot instead of creating rot ?
  //   var rot = Math.round(rowRot);

    // TOTO: optimise
    // Send Right(t) or Left(y)

    // if (rot>5){
    //   socket.emit("dir", "l");
    // } else if (-rot>5){
    //   socket.emit("dir", "r");
    // }else{
    //   socket.emit("dir", "x");
    //   socket.emit("left_up");
    // }


    // BEFORE Optimisation 1
    //     if (rot>5){
    //   socket.emit("left_up");
    //   socket.emit("right_do");
    //   // socket.emit("orientation", "Right")
    // } else if (-rot>5){
    //   socket.emit("right_up");
    //   socket.emit("left_do");
    //   // socket.emit("orientation", "left")

    // }else{
    //   socket.emit("right_up");
    //   socket.emit("left_up");
    // }

    // socket.emit("orientation", rot)
  // });

  var but_j = document.getElementById('j')
  var but_g = document.getElementById('g')
  var but_f = document.getElementById('f')
  var but_b = document.getElementById('b')


  // TODO: Loop functions (?)
  // TOTO: Use Json (?)
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