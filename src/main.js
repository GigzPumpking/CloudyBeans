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

let money = 0;

let moneyConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
    },
    fixedWidth: 100
}