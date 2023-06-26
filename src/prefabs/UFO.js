class UFO extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;

        this.scale = 1;
        this.body.setVelocity(ufoSpeed, 0);
        this.rotation;
        this.setInteractive({
            useHandCursor: true,
        });
        this.on('pointerdown', this.ufoClick);
        this.dead = false;

        // play UFO sound
        this.scene.sound.play('ufo', { volume: 0.5 });
    }

    update() {
        if (this.x > game.config.width) {
            this.destroy();
        }

        // Move in a sine wave
        this.y = 100 + Math.sin(this.x / 100) * 50;
    }

    ufoClick() {
        money += ufoValue*beansValue;

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

        this.death();
        this.dead = true;
    }

    spewBeans() {
        // play a random money sound

        let rand = Math.floor(Math.random() * 3) + 1;
        this.scene.sound.play('money' + rand, { volume: 1 });

        // throw beans in random directions downwards
        for (let i = 0; i < Math.random() * 5 + 5; i++) {
            let bean = new Bean(this.scene, this.x, this.y, 'bean');
            bean.body.setVelocity(Math.random() * 100 - 50, Math.random() * 100 + 50);
            beans.add(bean);
        }
    }

    death() {
        if (!this.dead) {
            // Wait 1 second, then destroy
            this.scene.time.delayedCall(1000, () => { 
                // Explosion particles
                this.lineEmitter = this.scene.add.particles(this.x, this.y, 'beandollar', {
                    speed: { min: 100, max: 200 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 0.1, end: 0 },
                    rotation: { min: 0, max: 360 },
                    blendMode: 'ADD',
                    lifespan: 200,
                    //rapidly changing orange to red tint
                    tint: [0xff0000, 0xff7700, 0xffaa00, 0xffdd00, 0xffff00],
                });
                // wait 1 second, then destroy particles
                this.scene.time.delayedCall(750, () => {
                    this.lineEmitter.destroy();
                }, null, this);

                // stop playing UFO sound
                this.scene.sound.stopByKey('ufo');
                this.scene.sound.play('explosion', { volume: 0.3 });
                this.destroy(); 
                ufoSpeed += 20;
            });
        }
    }
}