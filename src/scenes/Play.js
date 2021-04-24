class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.comets = [];
        this.numComets = 3;
        this.sideBuffer = 50;
    }

    preload() {
        this.load.image('dino', './assets/trex_001.png');
        this.load.image('comet', './assets/comets-1.png');

    }

    create() {
        this.dino = new Dino(
            this,
            this.sideBuffer,
            game.config.height/2,
            'dino'
        );

        for (let i = 0; i < this.numComets; i++) {
            let comet = new Comet(
                this,
                Math.random() * game.config.width,
                Math.random() * game.config.height,
                'comet'
            );
            this.comets.push(comet);
        }
    }

    update() {
        for(let c = 0; c < this.comets.length; c++) {
            if(this.checkCollision(this.comets[c])) {
                console.log("Collided");
            }
        }
    }

    distanceBetween(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
    }

    checkCollision(comet) {
        if (this.distanceBetween(this.dino.x, this.dino.y 
            + this.dino.height/4, comet.x, comet.y) < 
            this.dino.collisionRadius + comet.collisionRadius) {
            return true;
        }
        if (this.distanceBetween(this.dino.x, this.dino.y 
            - this.dino.height/4, comet.x, comet.y) < 
            this.dino.collisionRadius + comet.collisionRadius) {
            return true;
        }
        return false;
    }
}