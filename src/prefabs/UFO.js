class UFO extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.scale = 1;
        this.body.setVelocity(100, 0);
        this.rotation;
        this.setInteractive({
            useHandCursor: true,
        });
        this.on('pointerdown', this.ufoClick);
    }

    update() {
        if (this.x > game.config.width) {
            this.destroy();
        }

        // Move in a sine wave
        this.y = 100 + Math.sin(this.x / 100) * 50;
    }

    ufoClick() {

        // change sprite to UFO2
        this.setTexture('ufo2');

        // play a random click sound
        let rand = Math.floor(Math.random() * 3) + 1;
        this.scene.sound.play('click' + rand, { volume: 1 });

        // start shaking the UFO
        this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 5,
            yoyo: true,
            angle: 10,
        });

        this.spewBeans();

    }

    spewBeans() {
        // play a random money sound

        let rand = Math.floor(Math.random() * 3) + 1;
        this.scene.sound.play('money' + rand, { volume: 1 });

        // throw beans in random directions downwards
        for (let i = 0; i < 16; i++) {
            let bean = new Bean(this.scene, this.x, this.y, 'bean');
            bean.body.setVelocity(Math.random() * 100 - 50, Math.random() * 100 + 50);
        }

        // Wait 1 second, then destroy
        this.scene.time.delayedCall(1000, () => { this.destroy(); });
    }
}