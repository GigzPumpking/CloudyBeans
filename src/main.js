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
    scene: [ Play, Title, Upgrades ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;

let money = 0;
let beans = null;

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

const textConfig = Object.assign({}, moneyConfig, { fontSize: '28px', backgroundColor: '#F0000C', color: '#000', align: 'center' });

const buttonConfig = Object.assign({}, moneyConfig, { fontSize: '16px', color: '#000', align: 'center', fixedWidth: 150 });

maxedUpgrades = [];

let keyESC;