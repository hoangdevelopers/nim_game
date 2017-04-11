import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: [this.game.value.font.logo, this.game.value.font.primary]
      },
      active: this.fontsLoaded
    })
    
    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.spritesheet('mummy_spritesheet', './assets/images/spritesheet/mummy.png', 37, 45, 18)
  }

  render () {
    this.state.start('Splash')
    // if (this.fontsReady) {
    //   this.state.start('Splash')
    // }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
