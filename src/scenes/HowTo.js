class HowTo extends Phaser.Scene {
    constructor() {
        super('howtoScene');
    }

    create() {
        var menuConfig = {
            fontFamily: 'Belanosima',
            fontSize: '28px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        let small

        this.add.text(game.config.width/2, game.config.height/9, 'How To Play', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 2*game.config.height/9, 'Use the mouse to click on falling beans', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 3.1*game.config.height/9, 'Collecting beans will earn you bean dollars,\nwhich can be spent on upgrades.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 4.5*game.config.height/9, 'Upgrades include: Beans earned per click \nand bean production factories.', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 6*game.config.height/9, 'Get as many beans as you can to\n DOMINATE the bean market!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 7.2*game.config.height/9, 'Look out for a UFO flying above the factory!\n Clicking it will get you some extra beans!', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.35, 8.5*game.config.height/9, 'Press ESC to return to the title screen menu', menuConfig).setOrigin(1.1).setFontSize(22);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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
