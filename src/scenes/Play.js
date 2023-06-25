class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('bean', 'bean.png');
        this.load.image('beandollar', 'beandollar.png');
        this.load.image('building', 'beanFacility.png');
    }
        
    create() {
        //Bean Spawn Timer
        this.time.addEvent({
            delay: 1000,
            callback: this.beanCreate,
            callbackScope: this,
            loop: true
        });
        
        this.cameras.main.setBackgroundColor('#FACADE');
        this.beans = this.add.group();

        this.moneyCounter = this.add.text(-70, 0, money, moneyConfig);
        //place bean dollar next to money counter
        this.add.image(60, 15, 'beandollar').setScale(0.1);
        this.add.image(game.config.width/2, game.config.height/2, 'building').setScale(1.01);

        //Create an upgrade button
        this.upgradeButton = this.add.text(60, 2, 'Upgrade', buttonConfig).setInteractive({
            useHandCursor: true,
        });
        this.upgradeButton.on('pointerdown', () => {
            this.scene.pause().launch('upgradesScene');
        });

    }

    update() {
        this.beans.rotate(0.05);
        this.moneyCounter.text = money;

    }

    removeItem(pointer, localX, localY, event) {
        /*let sceneContext = this.scene;  // get scene context before we kill the object
        sceneContext.playPop();         // play pop sound*/

        money += 1;
        this.destroy();             // destroy the child obj

        // check for special guest if all circles are gone
        /*if(!sceneContext.circles.getLength()) {
            sceneContext.sparkJoy();
        }*/
    }

    beanCreate() {
        let beanSet = ['bean'];
        let randX = Math.random() * game.config.width;
        let bean = new Bean(this, randX, -10, beanSet[0]);
        let randRotation = Math.random() * 360;
        bean.rotation += randRotation;
        bean.setInteractive({
            useHandCursor: true,
        });
        bean.on('pointerdown', this.removeItem);
        this.beans.add(bean);
    }

}