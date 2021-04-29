"use strict";
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        this.load.image('menu_back','./assets/Menubackground-1.png');
        this.load.audio('menu', './assets/menu.wav');
        
        if(!this.textures.exists('atlas')){
            this.load.multiatlas('atlas', 'assets/atlas.json', "assets");
        }
    }

    create() {
        this.background = this.add.tileSprite(0,0,640,480,'menu_back').setOrigin(0,0);
        this.bgm = this.sound.add('menu',{volume: 0.3,loop:true});
        this.bgm.play();
        // display score
        let menuConfig = {
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

        // Temporary Menu
        //Show Menu Text
        this.add.text(game.config.width/2, game.config.height/2 - 50, 
            'Dodgy Dino', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 
            'Press W to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 50, 
            'Press SPACE to see controls', menuConfig).setOrigin(0.5);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.sound.stopAll();
            this.scene.start('playScene');

        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.stopAll();
            this.scene.start('controlScene');
        }
    }
}