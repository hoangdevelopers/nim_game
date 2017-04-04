import Phaser from 'phaser'
import { centerGameObjects, initText } from '../utils'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.loading = this.add.sprite(this.world.centerX - 20, this.world.centerY, 'mummy_spritesheet');
    this.loading.animations.add('walk');
    this.loading.animations.play('walk', 50, true);
    
    this.logo = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.lang.GAME)
    this.loadingText = this.add.text(this.world.centerX, this.world.centerY + 60, this.game.lang.GAME_LOADING)
    initText([{
      context: this.logo,
      font: this.game.value.font.logo,
      fontSize: 40,
      fill: this.game.value.color.text,
      smoothed: false
    },  {
      context: this.loadingText,
      font: this.game.value.font.primary,
      fontSize: 20,
      fill: this.game.value.color.text,
      smoothed: false
    }])
    
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.json('test', 'http://monzj-minhlv.rhcloud.com/Food?limit=4000')
  }

  create () {
  // this.state.start('Game')
  }

}
