"use strict";
class Dino extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.collisionRadius = this.height / 2;
        this.side_buffer = this.width/2;
    }
    update(){
        if(keyS.isDown) {
            this.y += this.movementSpeed;
            this.setTexture('dinoDown');
        }
        if(keyW.isDown) {
            this.y -= this.movementSpeed;
            this.setTexture('dinoUp');
        }
        if(keyA.isDown) {
            this.x -= this.movementSpeed;
            this.setTexture('dinoDown');
        }
        if(keyD.isDown) {
            this.x += this.movementSpeed;
            this.setTexture('dino');
        }

        this.checkBoundaries();
    }

    checkBoundaries() {
        if (this.x < this.side_buffer) {
            this.x = this.side_buffer;
        }
        if (this.x > game.config.width - this.side_buffer) {
            this.x = game.config.width - this.side_buffer
        }
        if (this.y < this.side_buffer) {
            this.y = this.side_buffer;
        }
        if (this.y > game.config.height - this.side_buffer) {
            this.y = game.config.height- this.side_buffer
        }
    }
}