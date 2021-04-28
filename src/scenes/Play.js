"use strict";
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.comets = [];
        this.cometTrails = [];
        this.fuelPickup;
        this.numComets = 3;
        this.sideBuffer = 50;
        this.cometDelay = 4;
        this.maxComets = 16;
        this.bonusTime = 0; // Extra time from fuel pickups (in seconds)
        this.timePlayed;
        this.highScore = 0;
    }

    preload() {
        this.load.image('background0', './assets/background0_sky.png');
        this.load.image('background1', './assets/background1_volcanoes.png');
        this.load.image('background2', './assets/background2_cyanGrass.png');
        this.load.image('background3', './assets/background3_purpleGrass.png');

        this.load.image('dino', './assets/trex_001.png');
        this.load.image('dinoDown', './assets/trex_down_001.png');
        this.load.image('dinoUp', './assets/trex_up_001.png');
        this.load.image('cometDiag', './assets/comets-1.png');
        this.load.image('comet', './assets/Rock.png');
        this.load.image('flame', './assets/Flame-1.png');
        this.load.image('fuel', './assets/Fuel Bottle-1.png');
    }

    create() {
        //Add tilesprites

        this.background0 = this.add.tileSprite(0, 0, 640, 480, 'background0').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);

        this.background0.depth = -3;
        this.background1.depth = -3;
        this.background2.depth = -3;
        this.background3.depth = -3;

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.dino = new Dino(
            this,
            this.sideBuffer,
            game.config.height/2,
            'dino'
        );

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.timeConfig = {
            fontFamily: 'Courier',
            bold: true,
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.highScoreConfig = {
            fontFamily: 'Courier',
            bold: true,
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }

        for (let i = 0; i < this.numComets; i++) {
            this.createComet();
        }

        this.timePlayed = this.add.text(
            game.config.width - 100, 
            0, 
            0,
            this.timeConfig
        );

        this.highScoreText = this.add.text(
            0, 
            0, 
            "High Score: " + this.highScore,
            this.highScoreConfig
        );

        this.timer = this.time.addEvent({
            delay: Infinity,
            callback: this.createComet(),
            callbackScope: this,
            loop: false
        });

        this.fuelPickup = new Fuel (
            this,
            game.config.width + 50,
            Math.random() * game.config.height,
            'fuel',
            0
        );
    }

    createComet() {
        if (this.comets.length >= this.maxComets) { 
            console.warn("Comets reached max"); return; }
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
        if (!this.comets[0].isPlaying) {
            this.add.text(game.config.width/2, game.config.height/2, 
                'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 
                'Press SPACE to Restart', this.scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log("Pressed space");
                this.comets = [];
                this.cometTrails = [];
                this.dino = null;
                this.bonusTime = 0;
                this.timer.timeScale = 0;
                if (this.timer.getElapsedSeconds() + this.bonusTime > this.highScore) {
                    this.highScore = this.timer.getElapsedSeconds() + this.bonusTime;
                }
                this.scene.restart();
                return;
            }
        } else {
            for(let c = 0; c < this.comets.length; c++) {
                this.comets[c].update();
                this.cometTrails[c].update();
                if(this.checkCollision(this.comets[c])) {
                    this.gameOver();
                }
            }

            if (this.checkCollision(this.fuelPickup)) {
                this.bonusTime += 5;
                this.fuelPickup.reset();
            }

            this.dino.update();
            this.fuelPickup.update();

            this.cometTimer(this.timer.getElapsedSeconds());

            this.background1.tilePositionX += 1;
            this.background2.tilePositionX += 2;
            this.background3.tilePositionX += 3;

            this.timePlayed.text = this.timer.getElapsedSeconds() + this.bonusTime;
        }
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
        if ((Math.floor(timerr) + this.bonusTime) / this.cometDelay > this.comets.length) {
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