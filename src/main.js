"use strict";
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
      fps: {
          target: 60,
          forceSetTimeOut: true
          },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Declare Keys
let keyA, keyD, keyW, keyS, keySPACE;