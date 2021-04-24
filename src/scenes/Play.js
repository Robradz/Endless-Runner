"use strict";
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.comets = [];
        this.cometTrails = [];
        this.numComets = 3;
        this.sideBuffer = 50;
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
            let comet = new Comet(
                this,
                game.config.width / 2,
                game.config.height / 2,
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

            console.log(comet, cometTrail);
            this.cometTrails.push(cometTrail);
            this.comets.push(comet);
        }
    }

    update() {
        for(let c = 0; c < this.comets.length; c++) {
            this.comets[c].update();
            this.cometTrails[c].update();
            if(this.checkCollision(this.comets[c])) {
                console.log("Collided");
            }
        }
        this.dino.update();
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