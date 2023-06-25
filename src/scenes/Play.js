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

        this.building = null;

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

        //Create an upgrade button
        this.upgradeButton = this.add.text(60, 2, 'Upgrade', buttonConfig).setInteractive({
            useHandCursor: true,
        });
        this.upgradeButton.on('pointerdown', () => {
            this.scene.launch('upgradesScene');
        });

    }

    buildingUpdate(building) {
        if (building == 'Bean Building 1') {  
            if (this.building == null){
                this.building = new Building(this, centerX/2, centerY/2, 'building').setOrigin(0, 0);
            }
        }
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