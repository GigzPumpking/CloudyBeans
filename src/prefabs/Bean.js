class Bean extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.value = 1;
        this.scale = 1;
        this.body.setVelocity(20, 100);
        this.rotation;
        this.setInteractive({
            useHandCursor: true,
        });
        this.on('pointerdown', this.beanClick);
    }

    update() {
        if (this.y > game.config.height) {
            this.destroy();
            beans.remove(this);
        }
        this.rotation += 0.05;
    }

    beanClick() {
        money += this.value;
        this.destroy();
        beans.remove(this);
    }
}