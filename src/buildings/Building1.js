class Building1 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 7000;
        this.value = 0;
        this.upgradeCost = b1UnlockCost;
        this.upgradeCostIncrease = 10;
        this.valueIncrease = 2;
        this.location = 70;
        this.floor = 'Floor 1';

        //Timer for money generation
        this.scene.time.addEvent({
            delay: this.delay,
            callback: this.moneyGenerate,
            callbackScope: this,
            loop: true
        });

        // First built, build workers
        this.workers.add(new Bean_Worker(this.scene,x+188,y+510,'bean3_toss',0,4,10).setDepth(5.5))


        // Add wheel
        this.wheel = new Wheel(this.scene,x+188+190,y+275,'wheel', 0 ,11, 11).setScale(0.65).setDepth(5.5)

    }

    addWorker() {
        this.workers.add(new Bean_Worker(this.scene,this.xloc+188+60*this.level,this.yloc+515,'bean3_box',0,3,5).setDepth(5.5))
    }

    update() {
        super.update();
    }
}