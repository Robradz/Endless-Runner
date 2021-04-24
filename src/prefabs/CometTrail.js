class CometTrail extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.comet;
    }

    linkComet(comet) {
        this.comet = comet;
        this.rotation = Math.atan(comet.movementSpeedY, comet.movementSpeedX);
    }

    update() {
        this.x = this.comet.x;
        this.y = this.comet.y;
    }
}