"use strict";
class CometTrail extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, comet) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.comet = comet;
        this.depth = -2;
        this.isAngleSet = false;
        this.isPlaying = true;
    }

    update() {
        if (!this.isPlaying) { return; }
        this.x = this.comet.x;
        this.y = this.comet.y;
        if (!this.isAngleSet) {
            this.rotation = Math.atan(this.comet.movementSpeedY 
                / this.comet.movementSpeedX);
        }
    }
}