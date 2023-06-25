// Slightly modified from Button class code from Ferenc Almasi: https://webtips.dev/webtips/phaser/interactive-buttons-in-phaser3
class Button {
    constructor(x, y, label, scene, callback, style) {
        this.button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive({ useHandCursor: true })
            .setStyle({ fill: '#FF0000' })
            .on('pointerdown', () => callback())
            .on('pointerover', () => this.button.setStyle({ fill: '#F39C12' }))
            .on('pointerout',  () => this.button.setStyle({ fill: '#FF0000' }))

        this.color = 'red';
    }

    redButton() {
        this.button.setStyle({ fill: '#FF0000' });
        this.button.on('pointerout', () => this.button.setStyle({ fill: '#FF0000' }));
        this.color = 'red';
    }

    greenButton() {
        this.button.setStyle({ fill: '#00FF00' });
        this.button.on('pointerout', () => this.button.setStyle({ fill: '#00FF00' }));
        this.color = 'green';
    }

    updateText(text) {
        this.button.setText(text);
    }
}