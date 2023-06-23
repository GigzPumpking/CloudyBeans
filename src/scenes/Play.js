class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.image('bean', './assets/bean.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#FACADE');
        this.beans = this.add.group();
        let beanSet = ['bean'];

        let randX = Math.random() * game.config.width;
        let randY = Math.random() * game.config.height;
        let randRotation = Math.random() * 360;
        let bean = this.beans.create(randX, randY, beanSet[0]);
        bean.rotation += randRotation;
        bean.setInteractive({
            useHandCursor: true,
        });
        bean.on('pointerdown', this.removeItem);

    }

    update() {
        this.beans.rotate(0.05)
    }

    removeItem(pointer, localX, localY, event) {
        let sceneContext = this.scene;  // get scene context before we kill the object
        sceneContext.playPop();         // play pop sound
        this.destroy();             // destroy the child obj

        // check for special guest if all circles are gone
        if(!sceneContext.circles.getLength()) {
            sceneContext.sparkJoy();
        }  
    }

}