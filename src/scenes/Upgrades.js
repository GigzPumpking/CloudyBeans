class Upgrades extends Phaser.Scene {
    constructor() {
        super({ key: 'upgradesScene' })
    }

    preload() {
        this.load.path = './assets/';

    }

    create() {
        this.play = this.scene.get('playScene');

        this.potentialUpgrades = ['Bean Click', 'Bean Building 1'];

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

        // Splice potential upgrades by all elements inside of maxedUpgrades
        for (let i = 0; i < maxedUpgrades.length; i++) {
            this.potentialUpgrades.splice(this.potentialUpgrades.indexOf(maxedUpgrades[i]), 1);
        }

        // Alternatively, instead of removing the maxed upgrades, you could display them as disabled buttons (not interactive)
        // Currently, the maxed upgrades are not displayed at all
        // Maxed Upgrades are stored in the array maxedUpgrades (in main.js)

        let mainText = this.add.text(centerX, centerY - 200, 'Upgrades', textConfig).setOrigin(0.5);

        // Create a white rectangle to serve as a background for the text
        let background = this.add.rectangle(centerX, centerY, 300, 300, 0xFFFFFF).setOrigin(0.5).setDepth(-1);

        this.upgradeButtons = [this.upgradeButton0, this.upgradeButton1, this.upgradeButton2, this.upgradeButton3, this.exit];

        // Escape Key to Exit
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        for (let i = 0; i < this.potentialUpgrades.length; i++) {
            let upgrade = this.potentialUpgrades[i];
            this.upgradeSelection(upgrade);
            this.verticalSpacing += 50;
        }

        this.exit = new Button(centerX, centerY + this.verticalSpacing, 'Exit', this, () => {
            this.scene.stop();
        })
    }

    update() {
        // update upgradeButtons group
        this.upgradeButtons = [this.upgradeButton0, this.upgradeButton1, this.upgradeButton2, this.upgradeButton3, this.exit];

        // If building 1 is unlocked AND Bean Building 2 is not in maxedUpgrades
        if (this.play.building1 && !maxedUpgrades.includes('Bean Building 2') && !this.upgradeButton2)
            this.upgradeSelection('Bean Building 2')
        
        // If building 2 is unlocked AND Bean Building 3 is not in maxedUpgrades
        if (this.play.building2 && !maxedUpgrades.includes('Bean Building 3') && !this.upgradeButton3)
            this.upgradeSelection('Bean Building 3')

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.stop();
        }

        this.updateButtonPosition();

        if (this.upgradeButton0) this.updateCost(0, clickCost, this.upgradeButton0);

        if (this.upgradeButton1) this.updateCost(1, this.upgradeCost1, this.upgradeButton1);

        if (this.upgradeButton2) this.updateCost(2, this.upgradeCost2, this.upgradeButton2);

        if (this.upgradeButton3) this.updateCost(3, this.upgradeCost3, this.upgradeButton3);
    }

    updateButtonPosition() {
        this.verticalSpacing = -100;
        for (let i = 0; i < this.upgradeButtons.length; i++) {
            if (this.upgradeButtons[i] != null) {
                this.upgradeButtons[i].changePosition(centerY + this.verticalSpacing);
                this.verticalSpacing += 50;
            }
        }
    }

    updateCost(num, cost, button) {
        // Update button text
        if (num == 0) button.updateText('Bean Value: ' + cost);
        else if (num == 1) button.updateText('First Floor: ' + cost);
        else if (num == 2) button.updateText('Second Floor: ' + cost);
        else if (num == 3) button.updateText('Third Floor: ' + cost);

        if (money < cost && button.status != 'red') {
            button.redButton();
        } else if (money >= cost && button.status != 'green') {
            button.greenButton();
        }
    }

    maxedFunction(current, maximum, button, upgrade) {
        if (current >= maximum) {
            maxedUpgrades.push(upgrade);
            button.destroy();
            return true;
        }
        return false;
    }

    popUp(upgrade, building) {
        let Upgraded;
        if (upgrade == 'Bean Click') Upgraded = this.add.text(460, 400, '+1', popUpConfig).setOrigin(0, 0.5).setDepth(100);
        else {
            Upgraded = this.add.text(460, 400, '+' + building.valueIncrease, popUpConfig).setOrigin(0, 0.5).setDepth(100);
        }
        this.tweens.add({
            targets: Upgraded,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => {
                Upgraded.destroy();
            }
        });
    }

    upgradeSelection(upgrade) {
        if (upgrade == 'Bean Click') {
            this.upgradeButton0 = new Button(centerX, centerY + this.verticalSpacing, 'Bean Value: ' + clickCost, this, () => {

                // Insert code to upgrade or unlock bean click
                if (money >= clickCost) {
                    this.play.clickUpdate();
                    this.updateCost(0, clickCost, this.upgradeButton0);
                    if (this.maxedFunction(beansValue, 10, this.upgradeButton0, upgrade)) this.upgradeButton0 = null;
                    this.updateButtonPosition();

                    this.popUp(upgrade);

                }
            });
        }
        else if (upgrade == 'Bean Building 1') { 
            this.upgradeButton1 = new Button(centerX, centerY + this.verticalSpacing, 'First Floor: ' + this.upgradeCost1, this, () => {

                // Insert code to upgrade or unlock bean building 1
                if (money >= this.upgradeCost1) {
                    this.play.buildingUpdate(upgrade);
                    this.upgradeCost1 = this.play.building1.upgradeCost;
                    if (this.maxedFunction(this.play.building1.value, 100, this.upgradeButton1, upgrade)) this.upgradeButton1 = null;

                    this.popUp(upgrade, this.play.building1);
                }
            })
        }
        else if (upgrade == 'Bean Building 2') {
            this.upgradeButton2 = new Button(centerX, centerY + this.verticalSpacing, 'Second Floor: ' + this.upgradeCost2, this, () => {
                    
                // Insert code to upgrade or unlock bean building 2

                if (money >= this.upgradeCost2) {
                    this.play.buildingUpdate(upgrade);
                    this.upgradeCost2 = this.play.building2.upgradeCost;
                    if (this.maxedFunction(this.play.building2.value, 500, this.upgradeButton2, upgrade)) this.upgradeButton2 = null;

                    this.popUp(upgrade, this.play.building2);
                }
            })
        }
        else if (upgrade == 'Bean Building 3') {
            this.upgradeButton3 = new Button(centerX, centerY + this.verticalSpacing, 'Third Floor: ' + this.upgradeCost3, this, () => {
                
                // Insert code to upgrade or unlock bean building 3

                if (money >= this.upgradeCost3) {
                    this.play.buildingUpdate(upgrade);
                    this.upgradeCost3 = this.play.building3.upgradeCost;
                    if (this.maxedFunction(this.play.building3.value, 1000, this.upgradeButton3, upgrade)) this.upgradeButton3 = null;

                    this.popUp(upgrade, this.play.building3);
                }
            })
        }
    }
}
