class Building2 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 750;
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
    }

    update() {
        super.update();
    }
}