class Upgrades extends Phaser.Scene {
    constructor() {
        super({ key: 'upgradesScene' })
    }

    preload() {
        this.load.path = './assets/';

    }

    create() {
        this.play = this.scene.get('playScene');

        this.upgradeButton1 = null;
        this.upgradeButton2 = null;
        this.upgradeButton3 = null;

        if (!this.play.building1) this.upgradeCost1 = 10;
        else this.upgradeCost1 = this.play.building1.upgradeCost;

        this.verticalSpacing = -100;
        this.potentialUpgrades = ['Bean Building 1', 'Bean Building 2', 'Bean Building 3'];

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
        this.updateCost(1, this.play.building1, this.upgradeCost1, this.upgradeButton1);
    }

    updateCost(num, building, cost, button) {
        if (!building) cost = 10;
        else cost = building.upgradeCost;

        // Update button text
        if (button) {
            button.updateText('Bean Building ' + num + ': ' + cost);
        }

        if (money < cost && button.color != 'red') {
            button.redButton();
        } else if (money >= cost && button.color != 'green') {
            button.greenButton();
        }
    }

    upgradeSelection(upgrade) {
        if (upgrade == 'Bean Building 1') { 
            this.upgradeButton1 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 1: ' + this.upgradeCost1, this, () => {

                // Insert code to upgrade or unlock bean building 1
                if (money >= this.upgradeCost1) {
                    this.play.buildingUpdate(upgrade);
                }
            })
        }
        else if (upgrade == 'Bean Building 2') {
            this.upgradeButton2 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 2', this, () => {
                    
                // Insert code to upgrade or unlock bean building 2
    
            })
        }
        else if (upgrade == 'Bean Building 3') {
            this.upgradeButton3 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 3', this, () => {
                
                // Insert code to upgrade or unlock bean building 3

            })
        }
    }
}
