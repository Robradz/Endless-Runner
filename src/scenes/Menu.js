"use strict";
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        this.load.image('menu_back','./assets/Menubackground-1.png')

    }

    create() {
        this.background = this.add.tileSprite(0,0,640,480,'menu_back').setOrigin(0,0);
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#03A1FC',
            color: '#02112B',
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
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('controlScene');
        }
    }
}