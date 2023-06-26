class Building2 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 5000;
        this.value = 0;
        this.upgradeCost = b2UnlockCost;
        this.upgradeCostIncrease = 50;
        this.valueIncrease = 5;
        this.location = 100;
        this.floor = 'Floor 2';

        //Timer for money generation
        this.scene.time.addEvent({
            delay: this.delay,
            callback: this.moneyGenerate,
            callbackScope: this,
            loop: true
        });

        this.workers.add(new Bean_Worker(this.scene,x+148+75,y+420,'bean2_toss',0,8,10).setDepth(4.5))

        this.pipe = new Wheel(this.scene,x+188+190,y+275,'pipe', 0 ,11, 11).setScale(0.65).setDepth(5.5)
    }

    addWorker() {
        this.workers.add(new Bean_Worker(this.scene,this.xloc+156+100*this.level+75,this.yloc+420,'bean2_grind',0,5,10).setDepth(4.5))
    }

    update() {
        super.update();
    }
}