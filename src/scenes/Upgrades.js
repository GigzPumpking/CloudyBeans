class Upgrades extends Phaser.Scene {
    constructor() {
        super({ key: 'upgradesScene' })
    }

    preload() {
        this.load.path = './assets/';

    }

    create() {
        this.playScene = this.scene.get('playScene');

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
    }

    upgradeSelection(upgrade) {
        let upgradeButton;
        if (upgrade == 'Bean Building 1') { 
            upgradeButton = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 1', this, () => {

                // Insert code to upgrade or unlock bean building 1
                this.playScene.buildingUpdate(upgrade);
            })
        }
        else if (upgrade == 'Bean Building 2') {
            upgradeButton = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 2', this, () => {
                    
                // Insert code to upgrade or unlock bean building 2
    
            })
        }
        else if (upgrade == 'Bean Building 3') {
            upgradeButton = new Button(centerX, centerY + this.verticalSpacing, 'Bean Building 3', this, () => {
                
                // Insert code to upgrade or unlock bean building 3

            })
        }
    }
}
