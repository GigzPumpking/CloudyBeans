class Upgrades extends Phaser.Scene {
    constructor() {
        super({ key: 'upgradesScene' })
    }

    preload() {
        this.load.path = './assets/';

    }

    create() {
        this.play = this.scene.get('playScene');

        this.upgradeButton0 = null;
        this.upgradeButton1 = null;
        this.upgradeButton2 = null;
        this.upgradeButton3 = null;

        if (!this.play.building1) this.upgradeCost1 = b1UnlockCost;
        else this.upgradeCost1 = this.play.building1.upgradeCost;

        if (!this.play.building2) this.upgradeCost2 = b2UnlockCost;
        else this.upgradeCost2 = this.play.building2.upgradeCost;

        if (!this.play.building3) this.upgradeCost3 = b3UnlockCost;
        else this.upgradeCost3 = this.play.building3.upgradeCost;

        this.verticalSpacing = -100;
        this.potentialUpgrades = ['Bean Click', 'Bean Building 1', 'Bean Building 2', 'Bean Building 3'];

        // Splice potential upgrades by all elements inside of maxedUpgrades
        for (let i = 0; i < maxedUpgrades.length; i++) {
            this.potentialUpgrades.splice(this.potentialUpgrades.indexOf(maxedUpgrades[i]), 1);
        }

        // Alternatively, instead of removing the maxed upgrades, you could display them as disabled buttons (not interactive)
        // Currently, the maxed upgrades are not displayed at all
        // Maxed Upgrades are stored in the array maxedUpgrades (in main.js)

        let mainText = this.add.text(centerX, centerY - 200, 'Upgrades', textConfig).setOrigin(0.5);

        for (let i = 0; i < this.potentialUpgrades.length; i++) {
            let upgrade = this.potentialUpgrades[i];
            this.upgradeSelection(upgrade);
            this.verticalSpacing += 50;
        }
        // Create a white rectangle to serve as a background for the text
        let background = this.add.rectangle(centerX, centerY, 300, 300, 0xFFFFFF).setOrigin(0.5).setDepth(-1);

        let Exit = new Button(centerX, centerY + this.verticalSpacing, 'Exit', this, () => {
            this.scene.stop();
        })

        // Escape Key to Exit
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.stop();
        }

        if (this.upgradeButton0) this.updateCost(0, clickCost, this.upgradeButton0);

        if (this.upgradeButton1) this.updateCost(1, this.upgradeCost1, this.upgradeButton1);

        if (this.upgradeButton2) this.updateCost(2, this.upgradeCost2, this.upgradeButton2);

        if (this.upgradeButton3) this.updateCost(3, this.upgradeCost3, this.upgradeButton3);
    }

    updateCost(num, cost, button) {
        // Update button text
        if (button && num != 0) {
            button.updateText('Bean Building ' + num + ': ' + cost);
        } else if (button && num == 0) {
            button.updateText('Bean Click: ' + cost);
        }

        if (money < cost && button.color != 'red') {
            button.redButton();
        } else if (money >= cost && button.color != 'green') {
            button.greenButton();
        }
    }

    upgradeSelection(upgrade) {
        if (upgrade == 'Bean Click') {
            this.upgradeButton0 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Click: ' + clickCost, this, () => {

                // Insert code to upgrade or unlock bean click
                if (money >= clickCost) {
                    this.play.clickUpdate();

                    if (beansValue >= 10) {
                        maxedUpgrades.push('Bean Click');
                        this.upgradeButton0.destroy();
                        this.upgradeButton0 = null;
                    }
                }
            });
        }
        else if (upgrade == 'Bean Building 1') { 
            this.upgradeButton1 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 1: ' + this.upgradeCost1, this, () => {

                // Insert code to upgrade or unlock bean building 1
                if (money >= this.upgradeCost1) {
                    this.play.buildingUpdate(upgrade);
                    this.upgradeCost1 = this.play.building1.upgradeCost;

                    if (this.play.building1.value >= 100) {
                        maxedUpgrades.push('Bean Building 1');
                        this.upgradeButton1.destroy();
                        this.upgradeButton1 = null;
                    }
                }
            })
        }
        else if (upgrade == 'Bean Building 2') {
            this.upgradeButton2 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 2: ' + this.upgradeCost2, this, () => {
                    
                // Insert code to upgrade or unlock bean building 2

                if (money >= this.upgradeCost2) {
                    this.play.buildingUpdate(upgrade);
                    this.upgradeCost2 = this.play.building2.upgradeCost;

                    if (this.play.building2.value >= 500) {
                        maxedUpgrades.push('Bean Building 2');
                        this.upgradeButton2.destroy();
                        this.upgradeButton2 = null;
                    }
                }
            })
        }
        else if (upgrade == 'Bean Building 3') {
            this.upgradeButton3 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 3: ' + this.upgradeCost3, this, () => {
                
                // Insert code to upgrade or unlock bean building 3

                if (money >= this.upgradeCost3) {
                    this.play.buildingUpdate(upgrade);
                    this.upgradeCost3 = this.play.building3.upgradeCost;

                    if (this.play.building3.value >= 1000) {
                        maxedUpgrades.push('Bean Building 3');
                        this.upgradeButton3.destroy();
                        this.upgradeButton3 = null;
                    }
                }
            })
        }
    }
}
