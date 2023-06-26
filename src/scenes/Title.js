class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        this.load.image('titlebackground', './assets/titlebackground.jpg');
    }

    create() {
        var menu_sign = this.add.sprite(game.config.width/2,game.config.height/2,'titlebackground').setScale(0.7);

        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '35px',
            color: '#FF9E1A',
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
            color: '#FFF21A',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
 
        // menu text
        this.add.text(1.5*game.config.width/2, 7*game.config.height/9, 'Press SPACE to start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/6, game.config.height/1.05, 'Press C for Credits', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/1.25, game.config.height/1.05, 'Press H for How to play', smallConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 2*game.config.height/23, 'Made in Phaser 3.60', smallConfig).setOrigin(0.5);

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