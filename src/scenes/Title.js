class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.audio('select1', 'sound/bean_select1.wav');
        this.load.audio('select2', 'sound/bean_select2.wav');
    }

    create() {

    }

    update() {

    }
}