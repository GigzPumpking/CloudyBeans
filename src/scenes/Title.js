class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    preload() {
        // Add loading text to center of the screen
        let loadingText = this.add.text(centerX, centerY, 'Loading...', {fontFamily: 'Courier', fontSize: '28px', color: '#FFFFFF'}).setOrigin(0.5);
        // load background image
        this.load.path = './assets/';
        this.load.image('titlebackground', './titlebackground.jpg');
        this.load.audio('title', 'sound/bean_title.mp3');
        this.load.audio('credits', 'sound/bean_credits.mp3');

        // load button hover sounds
        this.load.audio('select1', 'sound/bean_select1.wav');
        this.load.audio('select2', 'sound/bean_select2.wav');

        // load button confirm sound
        this.load.audio('confirm', 'sound/bean_confirm.wav');

    }

    create() {
        // place background
        this.background = this.add.tileSprite(0, 0, 2160, 1620, 'titlebackground').setOrigin(0, 0);
        this.background.scale /= 1.625;

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

        // Add start button
        let startButton = new Button(game.config.width/2 + 235, 25, 'CLICK TO START', this, () => {
            this.scene.start('playScene');
        });
        startButton.whiteButton();
        startButton.button.setFontSize(30);

        let creditsButton = new Button(game.config.width/5, game.config.height/1.15, 'CREDITS', this, () => {
            this.scene.start('creditScene');
        });
        creditsButton.whiteButton();
        creditsButton.button.setStyle(smallConfig);

        let howtoButton = new Button(game.config.width/1.25, game.config.height/1.15, 'HOW TO PLAY', this, () => {
            this.scene.start('howtoScene');
        });
        howtoButton.whiteButton();
        howtoButton.button.setStyle(smallConfig);

        this.add.text(game.config.width/2, game.config.height/1.05, 'Made in Phaser 3.60', smallConfig).setOrigin(0.5);

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

        this.sound.stopAll();
        this.title = this.sound.add('title', {volume: 0.8, loop: true});
        this.title.play();

    }

    update() {

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