class HowTo extends Phaser.Scene {
    constructor() {
        super('howtoScene');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '35px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/6, 'How To Play', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/3, 'Click Beans', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 75, 'Click UFOs', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 150, 'Click Upgrades', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 225, 'Have Fun!', menuConfig).setOrigin(0.5);

        // Escape button
        let escapeButton = new Button(game.config.width/2, game.config.height/3 + 325, 'RETURN TO MENU', this, () => {
            this.scene.start('titleScene');
        });
        escapeButton.whiteButton();
        escapeButton.button.setFontSize(30);

        this.add.text(game.config.width/2, game.config.height/3 + 325, 'Press to return to the menu', menuConfig).setOrigin(0.5);
    }
}
