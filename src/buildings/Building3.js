class Building3 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 500;
        this.value = 0;
        this.upgradeCost = b3UnlockCost;
        this.upgradeCostIncrease = this.upgradeCost;
        this.valueIncrease = 10;
        this.location = 100;
        this.floor = 'Floor 3';

        //Timer for money generation
        this.scene.time.addEvent({
            delay: this.delay,
            callback: this.moneyGenerate,
            callbackScope: this,
            loop: true
        });
        
        let scale = 0.3;

        this.workers.add(new Bean_Worker(this.scene,x+180,y+190,'bean1_toss',0,8,10).setScale(scale))
        this.workers.add(new Bean_Worker(this.scene,x+256,y+190,'bean1_box',0,9,10).setScale(scale))
        this.workers.add(new Bean_Worker(this.scene,x+300,y+190,'bean1_box',0,9,10).setScale(scale))
        this.workers.add(new Bean_Worker(this.scene,x+350,y+190,'bean1_box',0,9,10).setScale(scale))
        this.workers.add(new Bean_Worker(this.scene,x+400,y+190,'bean1_box',0,9,10).setScale(scale))
    }

    update() {
        super.update();
        this.upgradeCostIncrease = this.upgradeCost;
    }
}