class Building3 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 3500;
        this.value = 0;
        this.upgradeCost = b3UnlockCost;
        this.upgradeCostIncrease = this.upgradeCost;
        this.valueIncrease = 20;
        this.location = 130;
        this.padding = 75;
        this.floor = 'Floor 3';

        //Timer for money generation
        this.scene.time.addEvent({
            delay: this.delay,
            callback: this.moneyGenerate,
            callbackScope: this,
            loop: true
        });
        
        let scale = 0.3;

        this.workers.add(new Bean_Worker(this.scene,x+180+this.padding,y+310,'bean1_toss',0,8,10).setScale(scale).setDepth(3.5))
        this.workers.add(new Bean_Worker(this.scene,x+256+this.padding,y+310,'bean1_box',0,9,10).setScale(scale).setDepth(3.5))

        this.loading = new Wheel(this.scene,x+188+190,y+275,'loading', 0 ,11, 11).setScale(0.65).setDepth(5.5)
    }

    addWorker() {
        this.workers.add(new Bean_Worker(this.scene,this.xloc + 250 + this.level*50 + this.padding, this.yloc+310,'bean1_box',0,9,10).setScale(0.3).setDepth(3.5))
    }

    update() {
        super.update();
        this.upgradeCostIncrease = this.upgradeCost;
    }
}