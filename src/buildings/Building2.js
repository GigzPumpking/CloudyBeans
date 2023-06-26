class Building2 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 5000;
        this.value = 0;
        this.upgradeCost = b2UnlockCost;
        this.upgradeCostIncrease = 50;
        this.valueIncrease = 5;
        this.location = 70;
        this.floor = 'Floor 2';

        //Timer for money generation
        this.scene.time.addEvent({
            delay: this.delay,
            callback: this.moneyGenerate,
            callbackScope: this,
            loop: true
        });

        this.workers.add(new Bean_Worker(this.scene,x+148,y+50,'bean2_toss',0,8,10))
        this.workers.add(new Bean_Worker(this.scene,x+256,y+50,'bean2_grind',0,5,10))
        this.workers.add(new Bean_Worker(this.scene,x+356,y+50,'bean2_grind',0,5,10))
    }

    update() {
        super.update();
    }
}