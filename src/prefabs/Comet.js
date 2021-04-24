"use strict";
class Comet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.baseMovementSpeed = Math.random() * 3 + 1;
        this.movementSpeedX;
        this.movementSpeedY;
        this.collisionRadius = 0;
        this.isHorizontal = Math.floor(Math.random() * 2);
        this.setLocation();
        this.depth = -1;
    }

    setLocation() {
        this.x = game.config.width / 2;
        this.y = game.config.height / 2;
    }

    update(){
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
        if (this.isHorizontal) {
            this.x = game.config.width + 50;
            this.y = Math.random() * game.config.height;
        } else {
            this.x = Math.random() * game.config.width / 2 + game.config.width / 2;
            this.y = -50;
        }
        this.baseMovementSpeed = Math.random() * 3 + 3;
    }
}