class Bean extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.value = beansValue;

        this.scale = 1.5;
        this.body.setVelocity(Math.random() * 20 + 20, Math.random() * 120 + 80);
        this.rotation;
        this.rotationSpeed = Math.random() * 0.11 - 0.05;
        this.setInteractive({
            useHandCursor: true,
        });
        this.on('pointerdown', this.beanClick);
        this.depth = 6;
    }

    update() {
        if (this.y > game.config.height) {
            this.destroy();
            beans.remove(this);
        }
        this.rotation += this.rotationSpeed;
    }

    beanClick() {
        // Spray particles in random directions around bean

        this.lineEmitter = this.scene.add.particles(this.x, this.y, 'beandollar', {
            speed: { min: 50, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.01, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000,
            tint: 0x00ff00,
        });

        // play a random click sound
        let rand = Math.floor(Math.random() * 3) + 1;
        this.scene.sound.play('click' + rand, { volume: 1 });
        money += this.value;

        // Wait 1 second, then destroy
        this.scene.time.delayedCall(750, () => {
            this.lineEmitter.destroy();
        }, null, this);

        this.destroy();
        beans.remove(this);
    }
}