let config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER
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
let beansValue = 1;

// Initial unlock costs HERE

let clickCost = 10;
let b1UnlockCost = 10;
let b2UnlockCost = 50;
let b3UnlockCost = 100;

let moneyConfig = {
    fontFamily: 'Courier',
    fontSize: '20px',
    color: '#843605',
    align: 'right',
    padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    },
    fixedWidth: 0
}

const textConfig = Object.assign({}, moneyConfig, { fontSize: '28px', backgroundColor: '#F0000C', color: '#000', align: 'center', fixedWidth: 0 });

const buttonConfig = Object.assign({}, moneyConfig, { fontSize: '16px', color: '#000', align: 'center', fixedWidth: 150 });

maxedUpgrades = []; 

let keyESC;