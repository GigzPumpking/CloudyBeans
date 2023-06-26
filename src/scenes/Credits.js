class Credits extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    create() {
        let menuConfig = {
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
 
        let smallConfig = {
            fontFamily: 'Verdana',
            fontSize: '27px',
            backgroundColor: '#303030',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.text(game.config.width/2, game.config.height/29, 'Credits', menuConfig).setOrigin(0.5).setFontFamily('Belanosima').setFontSize(39);
        this.add.text(game.config.width/2, 2*game.config.height/19, 'Game Engine: Phaser 3.60', smallConfig).setOrigin(0.5).setColor('#F1EA2B');

        // People involved
        this.add.text(game.config.width/2, 3.1*game.config.height/15, 'Daphne Cheng: Initial Concept, Art, and Design', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#39B8FF').setAlign('center').setOrigin(0.5);
        this.add.text(game.config.width/3.5, 3.25*game.config.height/9, 'Abel Goy: Design/Programming/Production', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#EA2B2B').setAlign('center').setOrigin(0.5);
        this.add.text(game.config.width/1.3, 3.25*game.config.height/9, 'Hung Nguyen: Programming/Design', smallConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setColor('#EA2B2B').setOrigin(0.5);

        this.add.text(game.config.width/1.3, 4.3*game.config.height/9, 'Hamburger: Animation', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#EAAD2B').setAlign('center').setOrigin(0.5);
        this.add.text(game.config.width/3.5, 4.3*game.config.height/9, 'Zephyr Laytart: Animation', smallConfig).setWordWrapWidth(game.config.width / 1.5).setColor('#EAAD2B').setAlign('center').setOrigin(0.5);

        this.add.text(game.config.width/4, 5.15*game.config.height/9, 'Jonah Ryan: Brainstorming\n/Cool Guy', smallConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setColor('#EA992B').setOrigin(0.5).setFontSize(23);
        this.add.text(game.config.width/1.3, 5*game.config.height/9, 'Ben Daly: Music/SFX', smallConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setColor('#00B127').setOrigin(0.5);
        this.add.text(game.config.width/2, 6*game.config.height/9, 'Ariel Arriaga: Writing/Art', smallConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setColor('#00B127').setOrigin(0.5);
        this.add.text(game.config.width/2, 7.5*game.config.height/9, 'UFO Art Asset: https://kububbis.itch.io/kawaii-ufo-sprite-pack', smallConfig).setWordWrapWidth(game.config.width / 2).setAlign('center').setColor('#00B127').setOrigin(0.5);


        // instructions
        this.add.text(game.config.width/1.35, 8.7*game.config.height/9, 'Press ESC to return to the title screen menu', smallConfig).setOrigin(1.1).setFontSize(22);

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.sound.stopAll();
        this.credits = this.sound.add('credits', {volume: 0.8, loop: true});
        this.credits.play();


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');    
        }
    }

}