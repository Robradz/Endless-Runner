"use strict";
class Comet extends Phaser.GameObjects.Sprite {
    constructor(scene, texture, frame) {
        super(scene, game.config.width / 2, game.config.width / 2, texture, frame);
        this.baseMovementSpeed = 3;
        this.movementSpeedX = 0;
        this.movementSpeedY = 0;
        this.collisionRadius = this.height / 2;
        scene.add.existing(this);
        this.isHorizontal = Boolean(Math.floor(Math.random() * 2));
        this.setLocation();
    }

    setLocation() {
        if(this.isHorizontal){
            this.x = game.config.width + 50;
            this.y = Math.random() * game.config.height;
            
        }else{
            this.x = Math.random() * (game.config.width - 100) + 100;
            this.y = -50;
            console.log(this.x, this. y);
        }
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
    }
}