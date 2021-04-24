class Comet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.collisionRadius = this.height / 2;
        this.isHorizontal = Math.floor(Math.random() * 2);
        this.setTexture(this.isHorizontal ? 'cometDiag' : 'cometHorz');
    }
}