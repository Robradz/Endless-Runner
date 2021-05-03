// Zachary Lu
// Jin Liu
// Zhiheng Su
// Robert Radzville
// May 3, 2021
// Creative Tilt:
// Technically interesting:
//    - Hourglass/ time manipulation mechanic: When you collide with
//      an hourglass, the game slows down, allowing the player to 
//      escape tricky situations.
//    - All collision done without the use of built in physics.
//      The hitbox has been made significantly smaller than the size
//      of the entire image/ sprite to better represent the actual dino.
//    - The current control scheme is the third iteration, made to
//      feel like the player is slightly out of control to fit the
//      theme (that you are a dinosaur trying to use a jetpack).
//    - Comet speeds, directions, and starting locations all have
//      elements of randomness.
//
// Visual Style:
//    - The team is really proud of the world that we were able to create,
//      one with interesting plants, big volcanos, and other dinosaurs.
//    - One visually interesting thing we added for extra style is the 
//      death animation. Before the death animation, it was pretty jarring
//      for everything to just suddenly stop.

"use strict";
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
      fps: {
          target: 60,
          forceSetTimeOut: true
          },
    scene: [Menu, Controls, Play]
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Declare Keys
let keyA, keyD, keyW, keyS, keySPACE, keyEsc;
let cursors;
