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
        this.add.text(game.config.width/2, game.config.height/3 + 300, 'Press ESC to return to the menu', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 375, 'Press P to pause', menuConfig).setOrigin(0.5);


        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }
}
