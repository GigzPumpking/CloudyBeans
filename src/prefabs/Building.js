//NOTE: Do not use this class directly. Use a subclass instead.

class Building extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.delay;
        this.value;
        this.upgradeCost;
        this.upgradeCostIncrease;
        this.valueIncrease;
        this.scale = 0.25;
    }

    moneyGenerate() {
        money += this.value;
    }

    update() {
        
    }

    upgrade() {
        this.value += this.valueIncrease;
        money -= this.upgradeCost;
        this.scene.moneyCounter.text = money;
        this.upgradeCost += this.upgradeCostIncrease;
    }
}