"use strict";
class Dino extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 4;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.collisionRadius = this.height / 2;
        this.side_buffer = this.width/2;
        this.sfxDown = scene.sound.add('goDown');
        this.sfxUp = scene.sound.add('goUp');
        this.sfxHover = scene.sound.add('hover');
        this.sfxHover.loop = true;
        this.sfxHover.play();
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS) || cursors.down.isDown) {
            this.ySpeed = this.movementSpeed;
            this.xSpeed = 0;
            this.sfxUp.stop();
            this.sfxDown.play();
            this.setTexture('dinoDown');
        }
        if(Phaser.Input.Keyboard.JustDown(keyW) || cursors.up.isDown) {
            this.ySpeed = -this.movementSpeed;
            this.xSpeed = 0;
            this.setTexture('dinoUp');
            this.sfxUp.play();
            this.sfxDown.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyA) || cursors.left.isDown) {
            this.xSpeed = -this.movementSpeed;
            this.ySpeed = 0;
            this.setTexture('dinoDown');
            this.sfxUp.stop();
            this.sfxDown.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyD) || cursors.right.isDown) {
            this.xSpeed = this.movementSpeed;
            this.ySpeed = 0;
            this.setTexture('dino');
            this.sfxUp.stop();
            this.sfxDown.stop();
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
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