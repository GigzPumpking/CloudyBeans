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
    }

    update() {
        super.update();
        this.upgradeCostIncrease = this.upgradeCost;
    }
}