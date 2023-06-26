class Wheel extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, frameCount, frameRate) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.anims.create({
            key: 'animation',
            frames: this.anims.generateFrameNumbers(texture, { start: 0, end: frameCount, first: 0 }),
            frameRate: frameRate,
            repeat: -1
        });

        this.anims.play('animation');
    }

    updateSpeed(){
        this.anims.timeScale = 2;
    }
}