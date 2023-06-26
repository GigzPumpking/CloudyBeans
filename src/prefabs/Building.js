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
        this.scale = 0.35;
        this.location;
        this.floor;
        this.workers = this.scene.add.group();
        this.level = 1;

        this.xloc = x;
        this.yloc = y;

        // Place text above building displaying its value
        this.valueText = this.scene.add.text(0, this.location, this.floor + ': ' + this.value + ' per ' + this.delay/1000 + 's', valueConfig);
        
    }

    moneyGenerate() {
        money += this.value;
    }

    update() {
        // Update value text
        this.valueText.text = this.floor + ': ' + this.value + ' per ' + this.delay/1000 + 's';
        if (this.valueText.y != this.location) this.valueText.y = this.location;
    }

    upgrade() {
        this.level++;

        this.value += this.valueIncrease;
        money -= this.upgradeCost;
        this.scene.moneyCounter.text = money;
        this.upgradeCost += this.upgradeCostIncrease;
    }
}