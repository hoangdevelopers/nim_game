/* globals __DEV__ */
import Phaser from 'phaser'
import Item from '../sprites/Item'
import { centerGameObjects, initText } from '../utils'
export default class extends Phaser.State {
  init () {}
  preload () {
    this.playBtn = this.add.button(this.world.centerX, this.world.centerY + 20, 'playBtn', this._pressPlay, this, 1, 0, 2);
    this.titleText = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.lang.GAME)
    initText([{
      context: this.titleText,
      font: this.game.value.font.logo,
      fontSize: 40,
      fill: this.game.value.color.text,
      smoothed: false
    }])
    centerGameObjects([this.playBtn])
  }

  create () {
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
  _pressPlay () {
    this.game.data = "abc"
    this.state.start('Game')

  }
}
