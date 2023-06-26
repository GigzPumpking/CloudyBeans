class Building1 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 7000;
        this.value = 0;
        this.upgradeCost = b1UnlockCost;
        this.upgradeCostIncrease = 10;
        this.valueIncrease = 2;
        this.location = 40;
        this.floor = 'Floor 1';

        //Timer for money generation
        this.scene.time.addEvent({
            delay: this.delay,
            callback: this.moneyGenerate,
            callbackScope: this,
            loop: true
        });

        // First built, build workers
        this.workers.add(new Bean_Worker(this.scene,x+128,y+50,'bean3_toss',0,4,10))
        for(let i = 1; i < 6; i++){
            this.workers.add(new Bean_Worker(this.scene,x+128+60*i,y+55,'bean3_box',0,3,5))
        }
    }

    update() {
        super.update();
    }
}