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

    }

    update() {

    }
}
