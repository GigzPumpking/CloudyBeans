class Bean extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.value = 1;
        this.scale = 1;
        this.body.setVelocity(0, 100);
    }

    update() {
        if (this.y > game.config.height) {
            this.destroy();
        }
    }
}