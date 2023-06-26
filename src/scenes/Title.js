class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
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
        let smallConfig = {
            fontFamily: 'Fantasy',
            fontSize: '27px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        // menu text
        this.add.text(game.config.width/2, game.config.height/6, 'Beans of Production', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/5, game.config.height/1.15, 'Press C for credits', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.25, game.config.height/1.15, 'Press H for How to play', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.05, 'Made in Phaser 3.60', smallConfig).setOrigin(0.5);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // Play mode
            this.scene.start('playScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            // Credits mode
            this.scene.start('creditScene');    
        }

        if (Phaser.Input.Keyboard.JustDown(keyH)) {
           // How to Play mode
           this.scene.start('howtoScene');    
       }
    }
}