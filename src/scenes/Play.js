"use strict";
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.comets = [];
        this.cometTrails = [];
        this.numComets = 4;
        this.sideBuffer = 50;
        this.cometDelay = 4;
    }

    preload() {
        this.load.image('dino', './assets/trex_001.png');
        this.load.image('dinoDown', './assets/trex_down_001.png');
        this.load.image('dinoUp', './assets/trex_up_001.png');
        this.load.image('cometDiag', './assets/comets-1.png');
        this.load.image('comet', './assets/Rock.png');
        this.load.image('flame', './assets/Flame-1.png');
    }

    create() {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dino = new Dino(
            this,
            this.sideBuffer,
            game.config.height/2,
            'dino'
        );


        //TODO: Randomize spawning
        for (let i = 0; i < this.numComets; i++) {
            this.createComet();
        }

        this.timer = this.time.addEvent({
            delay: Infinity,
            callback: this.createComet(),
            callbackScope: this,
            loop: false
        });

    }

    createComet() {
        if (this.comets.length > 15) { return; }
        let comet = new Comet(
            this,
            game.config.width + 50,
            Math.random() * game.config.height,
            'comet',
            0
        );

        let cometTrail = new CometTrail(
            this,
            comet.x,
            comet.y,
            'flame',
            0,
            comet
        );

        this.cometTrails.push(cometTrail);
        this.comets.push(comet);
        console.log(this.comets.length);
    }

    update() {
        for(let c = 0; c < this.comets.length; c++) {
            this.comets[c].update();
            this.cometTrails[c].update();
            if(this.checkCollision(this.comets[c])) {
                this.gameOver();
            }
        }
        this.dino.update();

        console.log(this.timer.getElapsedSeconds());
        this.cometTimer(this.timer.getElapsedSeconds());
    }

    gameOver() {
        this.dino.movementSpeed = 0;
        for(let c = 0; c < this.comets.length; c++) {
            this.comets[c].isPlaying = false;
            this.cometTrails[c].isPlaying = false;
            this.comets[c].movementSpeedX = 0;
            this.comets[c].movementSpeedY = 0;
        }
    }

    cometTimer(timerr){
        console.log(Math.floor(timerr), this.comets.length);
        if (Math.floor(timerr)/this.cometDelay > this.comets.length) {
            this.createComet();
        }
    }

    randomizeSpawningPair() {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }

    distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }

    checkCollision(comet) {
        if (this.distanceBetween(this.dino.x, this.dino.y 
            + this.dino.height/8, comet.x, comet.y) < 
            this.dino.collisionRadius + comet.collisionRadius) {
            return true;
        }
        if (this.distanceBetween(this.dino.x, this.dino.y 
            - this.dino.height/8, comet.x, comet.y) < 
            this.dino.collisionRadius + comet.collisionRadius) {
            return true;
        }
        return false;
    }
}