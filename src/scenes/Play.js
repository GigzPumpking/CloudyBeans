class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        // Add loading text to center of the screen
        let loadingText = this.add.text(centerX, centerY, 'Loading...', {fontFamily: 'Courier', fontSize: '28px', color: '#FFFFFF'}).setOrigin(0.5);
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

        // Load Bean workers
        this.load.spritesheet('bean3_idle', 'Bean Worker/bean_floor3_idle.png', {frameWidth: 560, frameHeight: 560, startFrame: 0, endFrame: 3});
        this.load.spritesheet('bean3_toss', 'Bean Worker/bean_floor3_toss.png', {frameWidth: 560, frameHeight: 560, startFrame: 0, endFrame: 4});
        this.load.spritesheet('bean3_box', 'Bean Worker/bean_floor3_box.png', {frameWidth: 560, frameHeight: 560, startFrame: 0, endFrame: 3});
       
        this.load.spritesheet('bean2_toss', 'Bean Worker/coffee_pea.png', {frameWidth: 560, frameHeight: 560, startFrame: 15, endFrame: 23});
        this.load.spritesheet('bean2_grind', 'Bean Worker/coffee_pea.png', {frameWidth: 560, frameHeight: 560, startFrame: 9, endFrame: 14});

        this.load.spritesheet('bean1_toss', 'Bean Worker/coffee_pea.png', {frameWidth: 560, frameHeight: 560, startFrame: 24, endFrame: 33});
        this.load.spritesheet('bean1_box', 'Bean Worker/coffee_pea.png', {frameWidth: 560, frameHeight: 560, startFrame: 34, endFrame: 43});

        // load UFO images and sound
        this.load.image('ufo1', 'UFO1.png');
        this.load.image('ufo2', 'UFO2.png');
        this.load.audio('ufo', 'sound/UFO.wav');
        this.load.audio('explosion', 'sound/explosion.wav')

        // load money sounds
        this.load.audio('money1', 'sound/money1.wav');
        this.load.audio('money2', 'sound/money2.wav');
        this.load.audio('money3', 'sound/money3.wav');

        // load wheel spritesheet
        this.load.spritesheet('wheel', 'wheel.png', {frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 11});

        this.load.spritesheet('pipe', 'pipe.png', {frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 11});

        this.load.spritesheet('loading', 'loading.png', {frameWidth: 1200, frameHeight: 1200, startFrame: 0, endFrame: 11});
    }
        
    create() {

        this.sound.stopAll();
        money = 0;
        ufoSpeed = 100;
        ufoValue = 5;
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // level music
        this.level1 = this.sound.add('level1', {volume: 0.8, loop: true});
        this.level1.play();

        this.level2 = this.sound.add('level2', {volume: 0.8, loop: true});

        this.level3 = this.sound.add('level3', {volume: 0.8, loop: true});

        //Create background
        this.background = this.add.tileSprite(0, 0, 2160, 1620, 'background').setOrigin(0, 0).setScale(0.5);
        clickCost = 5;
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
        this.upgradeButton = new Button(game.config.width - 90, 25, 'Upgrade', this, () => {
            this.scene.launch('upgradesScene');
        });
        this.upgradeButton.whiteButton();
        this.upgradeButton.button.setFontSize(36);

        //Create a pause button
        this.pauseButton = new Button(this.moneySpacing + 70, 15, 'Pause', this, () => {
            if (this.scene.isActive('upgradesScene')) {
                this.scene.stop('upgradesScene');
            }
            this.scene.pause().launch('pauseScene');
        });
        this.pauseButton.whiteButton();
        this.pauseButton.button.setFontSize(24);

        //Create a UFO on a random interval
        this.time.addEvent({
            delay: 22500,
            callback: this.ufoCreate,
            callbackScope: this,
            loop: true
        });

        this.valueText = this.add.text(0, 40, 'Bean Value: ' + beansValue, valueConfig);

        this.ufoCreate();
    }

    ufoCreate() {
        this.ufo = new UFO(this, -50, 100, 'ufo1').setOrigin(0, 0).setScale(0.2);
    }

    buildingUpdate(building) {
        this.sound.play('upgrade', { volume: 0.5 });
        if (building == 'Bean Building 1') {  
            if (!this.building1){
                this.building1 = new Building1(this, centerX/2 - 180, centerY/2 - 120, 'floor1').setOrigin(0, 0).setDepth(5);
            }
            if (this.building1.level < 7) this.building1.addWorker();
            this.building1.upgrade();
            this.building1.valueIncrease += 1;
        } 
        else if (building == 'Bean Building 2') {
            if (!this.building2){
                this.building2 = new Building2(this, centerX/2 - 180, centerY/2 - 120, 'floor2').setOrigin(0, 0).setDepth(4);
                this.level1.stop();
                this.level2.play();
            }
            if (this.building2.level < 4) this.building2.addWorker();
            this.building2.upgrade();
            this.building2.valueIncrease += 5;
        }
        else if (building == 'Bean Building 3') {
            if (!this.building3){
                this.building3 = new Building3(this, centerX/2 - 180, centerY/2 - 120, 'floor3').setOrigin(0, 0).setDepth(3);
                this.level2.stop();
                this.level3.play();
            }
            if (this.building3.level < 6) this.building3.addWorker();
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
        this.pauseButton.button.x = this.moneySpacing + 70;


        this.valueText.text = 'Bean Value: ' + beansValue + ' per click';
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

        if (this.ufo) this.ufo.update();
    }

}