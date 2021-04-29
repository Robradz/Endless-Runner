"use strict";
class Controls extends Phaser.Scene {
    constructor() {
        super("controlScene");
    }
    
    preload() {
        this.load.image('Instruc_back','./assets/Instruc_background.png')

    }

    create() {
        this.background = this.add.tileSprite(0,0,640,480,'Instruc_back').setOrigin(0,0);
        // display score
        let menuConfig = {
            fontFamily: 'stoneAge',
            fontSize: '18px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // Temporary Menu
        //Show Menu Text
        this.add.text(game.config.width/2, game.config.height/2 - 150, 
            'Use WASD or Arrow Keys to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, 
            'Press SPACE to restart when dead', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2- 50, 
            'Press ESC to Exit to the menu', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 30, 
            'Fuel tanks add time to the timer', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 120, 
            'Hourglasses temporarily freeze comets', menuConfig).setOrigin(0.5);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}