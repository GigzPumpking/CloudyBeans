let config = {
    type: Phaser.WEBGL,
    width: 700,
    height: 360,
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
    scene: [ Play, Title ]
}

let game = new Phaser.Game(config);