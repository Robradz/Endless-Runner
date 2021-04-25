"use strict";
class Comet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.baseMovementSpeed = 3;
        this.movementSpeedX = 0;
        this.movementSpeedY = 0;
        this.collisionRadius = this.height / 2;
        this.isHorizontal = Math.floor(Math.random() * 2);
        this.setLocation();
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
    }

        
