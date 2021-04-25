"use strict";
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {

    }

    create() {
        // display score
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#03A1FC',
            color: '#02112B',
            align: 'right',
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
            'Press W to start. Move with WASD', menuConfig).setOrigin(0.5);
        
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.scene.start('playScene');
        }
    }
}