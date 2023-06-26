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

        // load building floors
        this.load.image('floor1', 'floor1.png');
        this.load.image('floor2', 'floor2.png');
        this.load.image('floor3', 'floor3.png');

        // load clicking sounds
        this.load.audio('click1', 'sound/click1.wav');
        this.load.audio('click2', 'sound/click2.wav');
        this.load.audio('click3', 'sound/click3.wav');

        // load music
        this.load.audio('level1', 'sound/bean_level1.mp3');
        this.load.audio('level2', 'sound/bean_level2.mp3');
        this.load.audio('level3', 'sound/bean_level3.mp3');

        // load upgrade sound
        this.load.audio('upgrade', 'sound/upgrade.wav');

        // load button hover sounds
        this.load.audio('select1', 'sound/bean_select1.wav');
        this.load.audio('select2', 'sound/bean_select2.wav');

        // load button confirm sound
        this.load.audio('confirm', 'sound/bean_confirm.wav');
    }
        
    create() {
        money = 0;
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // level music
        this.level1 = this.sound.add('level1', {volume: 0.3, loop: true});
        this.level1.play();

        this.level2 = this.sound.add('level2', {volume: 0.3, loop: true});

        this.level3 = this.sound.add('level3', {volume: 0.3, loop: true});

        //Create background
        this.background = this.add.tileSprite(0, 0, 2160, 1620, 'background').setOrigin(0, 0).setScale(0.5);
        clickCost = 10;
        this.building1 = null;
        this.building2 = null;
        this.building3 = null;

        /*// Add a building sprite to the middle
        this.building = this.add.sprite(centerX/2 - 150, centerY/2 - 70, 'building').setOrigin(0, 0).setScale(0.325);*/

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
        this.upgradeButton = new Button(this.moneySpacing + 75, 15, 'Upgrade', this, () => {
            this.scene.launch('upgradesScene');
        });
        this.upgradeButton.blackButton();

    }

    buildingUpdate(building) {
        this.sound.play('upgrade', { volume: 0.5 });
        if (building == 'Bean Building 1') {  
            if (!this.building1){
                this.building1 = new Building1(this, centerX/2 - 50 - 25, centerY/2 + 50 + 300, 'floor1').setOrigin(0, 0);
            }
            this.building1.upgrade();
            this.building1.valueIncrease += 1;
        } 
        else if (building == 'Bean Building 2') {
            if (!this.building2){
                this.building2 = new Building2(this, centerX/2 - 34 - 25, centerY/2 - 28 + 300, 'floor2').setOrigin(0, 0);
                this.level1.stop();
                this.level2.play();
            }
            this.building2.upgrade();
            this.building2.valueIncrease += 5;
        }
        else if (building == 'Bean Building 3') {
            if (!this.building3){
                this.building3 = new Building3(this, centerX/2 - 47 - 25, centerY/2 - 260 + 300, 'floor3').setOrigin(0, 0);
                this.level2.stop();
                this.level3.play();
            }
            this.building3.upgrade();
            this.building3.valueIncrease += 10;
        }
    }

    clickUpdate() {
        this.sound.play('upgrade', { volume: 0.5 });
        beansValue += 1;
        money -= clickCost;
        this.moneyCounter.text = money;
        clickCost += 10;
    }

    moneyUIUpdate() {
        this.moneySpacing = this.moneyCounter.x + this.moneyCounter.width + 30;
        this.moneyCounter.text = money;
        this.moneyCounterIcon.x = this.moneySpacing;
        this.upgradeButton.button.x = this.moneySpacing + 75;
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

        //When P is pressed, pause the game
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            // if Upgrades scene is open, close it
            if (this.scene.isActive('upgradesScene')) {
                this.scene.stop('upgradesScene');
            }
            this.scene.pause().launch('pauseScene');
        }
    }

}