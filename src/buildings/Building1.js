class Building1 extends Building {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.delay = 1000;
        this.value = 0;
        this.upgradeCost = 10;
    }

    update() {
        super.update();
    }

    upgrade() {
        this.value += 1;
        money -= this.upgradeCost;
        this.upgradeCost += 10;
    }
}