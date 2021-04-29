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
        this.sfxDown = scene.sound.add('down');
        this.sfxUp = scene.sound.add('up');
        this.sfxLeft = scene.sound.add('left');
        this.sfxRight = scene.sound.add('right');
        this.sfxHover = scene.sound.add('hover');
        this.sfxBrake = scene.sound.add('brake');
        this.sfxHover.loop = true;
        this.sfxHover.play();
        this.isBraking = false;
        this.BrakingSpeed = 0.2;
        
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyS) || cursors.down.isDown) {
            this.isBraking = false;
            this.ySpeed = this.movementSpeed;
            this.xSpeed = 0;
            this.sfxUp.stop();
            this.sfxDown.play();
            this.anims.play('down');
        }
        if(Phaser.Input.Keyboard.JustDown(keyW) || cursors.up.isDown) {
            this.isBraking = false;
            this.ySpeed = -this.movementSpeed;
            this.xSpeed = 0;
            this.anims.play('up');
            this.sfxUp.play();
            this.sfxDown.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyA) || cursors.left.isDown) {
            this.isBraking = false;
            this.xSpeed = -this.movementSpeed;
            this.ySpeed = 0;
            this.anims.play('left');
            this.sfxLeft.play();
            this.sfxRight.stop();
        }
        if(Phaser.Input.Keyboard.JustDown(keyD) || cursors.right.isDown) {
            this.isBraking = false;
            this.xSpeed = this.movementSpeed;
            this.ySpeed = 0;
            this.anims.play('right');
            this.sfxLeft.stop();
            this.sfxRight.play();
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.isBraking = true;
            this.anims.play('idle');
            this.sfxUp.stop();
            this.sfxDown.stop();
            this.sfxLeft.stop();
            this.sfxRight.stop();
            this.sfxBrake.play();
        }
        if(this.isBraking){
            if(this.xSpeed == 0 && this.ySpeed == 0){
                this.isBraking = false;
            }
            if(this.xSpeed > 0){
                this.xSpeed -= this.BrakingSpeed;
            }else if(this.xSpeed < 0){
                this.xSpeed += this.BrakingSpeed;
            }
            if(this.ySpeed > 0){
                this.ySpeed -= this.BrakingSpeed;
            }else if(this.ySpeed < 0){
                this.ySpeed += this.BrakingSpeed;
            }
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