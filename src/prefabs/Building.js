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

        // Place text above building displaying its value
        this.valueText = this.scene.add.text(this.x + this.width*this.scale / 2 - 30, this.y - 30, 'Value: ' + this.value + ' / ' + this.delay/1000 + 's', { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
    }

    moneyGenerate() {
        money += this.value;
    }

    update() {
        // Update value text
        this.valueText.text = 'Value: ' + this.value + ' / ' + this.delay/1000 + 's';
    }

    upgrade() {
        this.value += this.valueIncrease;
        money -= this.upgradeCost;
        this.scene.moneyCounter.text = money;
        this.upgradeCost += this.upgradeCostIncrease;
    }
}