let config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 540,
    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.RESIZE
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            fps: 60
        }
    },
    scene: [ Title ]
}

let game = new Phaser.Game(config);