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
        this.load.image('background2', './assets/background2_smallGrass.png');
        this.load.image('background3', './assets/background3_midGrass.png');
        this.load.image('background4', './assets/background4_foreGrass.png');

        // this.load.image('dino', './assets/trex_001.png');
        // this.load.image('dinoDown', './assets/trex_down_001.png');
        // this.load.image('dinoUp', './assets/trex_up_001.png');
        // this.load.image('cometDiag', './assets/comets-1.png');
        // this.load.image('comet', './assets/Rock.png');
        // this.load.image('flame', './assets/Flame-1.png');
        //this.load.image('fuel', './assets/Fuel Bottle-1.png');

        this.load.audio('down','./assets/down.wav');
        this.load.audio('hover', './assets/hover.wav');
        this.load.audio('up', './assets/up.wav');
        this.load.audio('left', './assets/left.wav');
        this.load.audio('right', './assets/right.wav');
        this.load.audio('brake', './assets/brake.wav');
        this.load.audio('falldown', './assets/falldown.wav');
        this.load.audio('theme', './assets/dinotheme.wav');
    }

    create() {
        //Add tilesprites

        this.background0 = this.add.tileSprite(0, 0, 640, 480, 'background0').setOrigin(0, 0);
        this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);
        this.background4 = this.add.tileSprite(0, 0, 640, 480, 'background4').setOrigin(0, 0);

        this.background0.depth = -3;
        this.background1.depth = -3;
        this.background2.depth = -3;
        this.background3.depth = -3;
        this.background4.depth = -3;

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        cursors = this.input.keyboard.createCursorKeys();

        this.sfxDied = this.sound.add('falldown');
        this.bgm = this.sound.add('theme',{volume: 0.3, loop:true});
        this.bgm.play();

        this.dino = new Dino(
            this,
            this.sideBuffer,
            game.config.height/2,
            'atlas',
            "dino/trex_idle_1.png"
        );
        this.dino.animUp = this.anims.generateFrameNames('atlas', { start: 1, end: 3, prefix:'dino/trex_up_', suffix:'.png' });
        this.dino.animDown = this.anims.generateFrameNames('atlas', { start: 1, end: 3, prefix:'dino/trex_down_', suffix:'.png' });
        this.dino.animForward = this.anims.generateFrameNames('atlas', { start: 1, end: 3, prefix:'dino/trex_forward_', suffix:'.png' });
        this.dino.animBack = this.anims.generateFrameNames('atlas', { start: 1, end: 3, prefix:'dino/trex_back_', suffix:'.png' });
        this.dino.animIdle = this.anims.generateFrameNames('atlas', { start: 1, end: 3, prefix:'dino/trex_idle_', suffix:'.png' });
        this.dino.anims.create({ key: 'up', frames: this.dino.animUp, frameRate: 10, repeat: -1 });
        this.dino.anims.create({ key: 'down', frames: this.dino.animDown, frameRate: 10, repeat: -1 });
        this.dino.anims.create({ key: 'left', frames: this.dino.animBack, frameRate: 10, repeat: -1 });
        this.dino.anims.create({ key: 'right', frames: this.dino.animForward, frameRate: 10, repeat: -1 });
        this.dino.anims.create({ key: 'idle', frames: this.dino.animIdle, frameRate: 10, repeat: -1 });
        this.dino.anims.play('idle');
        this.scoreConfig = {
            fontFamily: 'Inconsolata',
            fontSize: '28px',
            backgroundColor: '#4C476B',
            color: '#fff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
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
            'atlas',
            'Fuel Bottle-1.png'
        );
    }

    createComet() {
        if (this.comets.length >= this.maxComets) { 
            console.warn("Comets reached max"); return; }
        let comet = new Comet(
            this,
            game.config.width + 50,
            Math.random() * game.config.height,
            'atlas',
            'Rock.png'
        );

        let cometTrail = new CometTrail(
            this,
            comet.x,
            comet.y,
            'atlas',
            'Flame-1.png',
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

            this.background0.tilePositionX += 0.3;
            this.background1.tilePositionX += 1;
            this.background2.tilePositionX += 2.5;
            this.background3.tilePositionX += 3;
            this.background4.tilePositionX += 6;
            
            this.timePlayed.text = this.timer.getElapsedSeconds() + this.bonusTime;
        }
        if (Phaser.Input.Keyboard.JustDown(keyEsc)) {
            this.sound.stopAll();
            this.scene.start('menuScene');
        }
    }

    gameOver() {
        this.dino.movementSpeed = 0;
        this.sound.stopAll();
        this.sfxDied.play();
        this.dino.anims.play('idle');
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