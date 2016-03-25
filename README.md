# Pantin64
Open a browser on a computeur and play MarioKart 64 with you touch device!

## Installation
For your web app and server, you need:
* [node.js](https://nodejs.org/en/)
* [socket.io](http://socket.io/)
* [RobotJS](https://github.com/octalmage/robotjs)
* [Express](https://www.npmjs.com/package/express)

And of course an emulator of Nitendo64 and a ROM. I use [SixtyForce](http://sixtyforce.com/) and [this ROM](http://emu-fr.net/v1/module.php?page=programme_detail&type_programme=roms&i=1611).
As the programm is merely a gamepad, you should be able to use it for any other game/application.

## Exemple
![alt text](./images/Pantin64_S_0.5.gif)

## Testing
1. Connect your laptop and phone on the same network
2. Start your emulator and ROM
3. Lunch the server : `node server.js`
5. On you mobile device, go to you server local address on port 3000 : *192.168.1.XX:3000*
6. You're good! Use touch buttons for controls and orient your device left or right for turning!

## To Improve
* Using JSON keymap
* Mutli players
* Online version
* Changing aspect/behavior of the gamepad depending of the state of the emulator : Waiting for opponent/menu/playing...
