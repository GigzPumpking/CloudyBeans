class Building1 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 1000;
        this.value = 0;
        this.upgradeCost = b1UnlockCost;
        this.upgradeCostIncrease = 10;
        this.valueIncrease = 1;

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
    }
}