class HowTo extends Phaser.Scene {
    constructor() {
        super('howtoScene');
    }

    create() {
        var menuConfig = {
            fontFamily: 'Verdana',
            fontSize: '28px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        let small

        this.add.text(game.config.width/2, game.config.height/6, 'How To Play', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.35, 8.5*game.config.height/9, 'Press ESC to return to the title screen menu', menuConfig).setOrigin(1.1).setFontSize(22);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }
}
