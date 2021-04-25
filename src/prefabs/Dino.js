"use strict";
class Dino extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.collisionRadius = this.height / 2;
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
    }
}