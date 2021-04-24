class Comet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, type) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.collisionRadius = this.height / 2;
        this.isHorizontal = Math.floor(Math.random() * 2);
        this.setTexture(this.isHorizontal ? 'cometHorz' : 'cometDiag');
    }
    update(){
        if(this.isHorizontal){
            this.x -= this.movementSpeed;
        }else{
            this.x -= this.movementSpeed/2;
            this.y += this.movementSpeed/2;
        }
    }
}