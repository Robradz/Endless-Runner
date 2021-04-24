"use strict";
class CometTrail extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, comet) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.comet = comet;
        this.depth = -2;
    }

    update() {
        this.x = this.comet.x;
        this.y = this.comet.y;
        this.rotation = Math.atan(this.comet.movementSpeedY 
            / this.comet.movementSpeedX);
    }
}