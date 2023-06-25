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
        beans = this.add.group({
            runChildUpdate: true
        });
        //Bean Spawn Timer
        this.time.addEvent({
            delay: 1000,
            callback: this.beanCreate,
            callbackScope: this,
            loop: true
        });
        
        this.cameras.main.setBackgroundColor('#FACADE');

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
        this.moneyCounter.text = money;
    }

    beanCreate() {
        let beanSet = ['bean'];
        let randX = Math.random() * game.config.width;
        let bean = new Bean(this, randX, -10, beanSet[0]);
        bean.rotation = Math.random() * 360;

        beans.add(bean);
    }

}