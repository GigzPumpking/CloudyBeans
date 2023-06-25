class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('bean', 'bean.png');
        this.load.image('beandollar', 'beandollar.png');
        this.load.image('building', 'beanFacility.png');
        this.load.image('background', 'background.jpg');
    }
        
    create() {
        //Create background
        this.background = this.add.tileSprite(0, 0, 2160, 1620, 'background').setOrigin(0, 0).setScale(0.5);
        clickCost = 10;
        this.building1 = null;
        this.building2 = null;
        this.building3 = null;

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

        this.moneyCounter = this.add.text(10, 0, money, moneyConfig);
        //place bean dollar next to money counter
        this.moneySpacing = this.moneyCounter.x + this.moneyCounter.width + 30;
        this.moneyCounterIcon = this.add.image(this.moneySpacing, 15, 'beandollar').setScale(0.1);

        //Create an upgrade button
        this.upgradeButton = this.add.text(this.moneySpacing + 10, 2, 'Upgrade', buttonConfig).setInteractive({
            useHandCursor: true,
        });
        this.upgradeButton.on('pointerdown', () => {
            this.scene.launch('upgradesScene');
        });

    }

    buildingUpdate(building) {
        if (building == 'Bean Building 1') {  
            if (!this.building1){
                this.building1 = new Building1(this, centerX/2 - 200, centerY/2, 'building').setOrigin(0, 0);
            }
            this.building1.upgrade();
        } 
        else if (building == 'Bean Building 2') {
            if (!this.building2){
                this.building2 = new Building2(this, centerX/2, centerY/2, 'building').setOrigin(0, 0);
            }
            this.building2.upgrade();
        }
        else if (building == 'Bean Building 3') {
            if (!this.building3){
                this.building3 = new Building3(this, centerX/2 + 200, centerY/2, 'building').setOrigin(0, 0);
            }
            this.building3.upgrade();
        }
    }

    clickUpdate() {
        beansValue += 1;
        money -= clickCost;
        this.moneyCounter.text = money;
        clickCost += 10;
    }

    moneyUIUpdate() {
        this.moneySpacing = this.moneyCounter.x + this.moneyCounter.width + 30;
        this.moneyCounter.text = money;
        this.moneyCounterIcon.x = this.moneySpacing;
        this.upgradeButton.x = this.moneySpacing + 10;
    }

    beanCreate() {
        let beanSet = ['bean'];
        let randX = Math.random() * game.config.width;
        let bean = new Bean(this, randX, -10, beanSet[0]);
        bean.rotation = Math.random() * 360;

        beans.add(bean);
    }

    update() {
        this.moneyUIUpdate();
        if (this.building1) this.building1.update();
        if (this.building2) this.building2.update();
        if (this.building3) this.building3.update();
    }

}