"use strict";
class HourGlass extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.baseMovementSpeed = Math.random() * 3;
        this.movementSpeedX;
        this.movementSpeedY;
        this.collisionRadius = this.height/2;
        this.isHorizontal = Math.floor(Math.random() * 2);
        this.reset();
        this.depth = -1;
        this.isPlaying = true;
    }
    
    update(){
        if (!this.isPlaying) { return };
        if(this.isHorizontal){
            this.movementSpeedX = this.baseMovementSpeed * -1;
            this.movementSpeedY = 0;
        }else{
            this.movementSpeedX = this.baseMovementSpeed * -1 / Math.sqrt(2);
            this.movementSpeedY = this.baseMovementSpeed / Math.sqrt(2);
        }

        this.x += this.movementSpeedX;
        this.y += this.movementSpeedY;

        if (this.x < 0 || this.y > game.config.height) {
            this.reset();
        }
    }

    reset() {
        this.isHorizontal = Math.floor(Math.random() * 2);
        if (this.isHorizontal) {
            this.x = game.config.width * 4;
            this.y = Math.random() * game.config.height * 0.8 + this.height/2;
        } else {
            this.x = Math.random() *  game.config.width * 4;
            this.y = game.config.height * -4;
        }
        this.baseMovementSpeed = Math.random() * 3 + 3;
    }
}