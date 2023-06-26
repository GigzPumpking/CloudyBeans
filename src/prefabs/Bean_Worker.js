class Bean_Worker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, frameCount, frameRate) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.scale = 0.2;

        this.anims.create({
            key: 'animation',
            frames: this.anims.generateFrameNumbers(texture, {start: 0, end: frameCount, first: 0}),
            repeat: -1,
            frameRate: frameRate
        });

        this.anims.play('animation');
    }

    updateSpeed(){
        this.anims.timeScale = 2;
    }
}