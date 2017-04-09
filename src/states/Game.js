/* globals __DEV__ */
import Phaser from 'phaser'
import Item from '../sprites/Item'
import { centerGameObjects, initText } from '../utils'
export default class extends Phaser.State {
  init () {}
  preload () {
    this.titleText = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.lang.GAME)
    initText([{
      context: this.titleText,
      font: this.game.value.font.logo,
      fontSize: 40,
      fill: this.game.value.color.text,
      smoothed: false
    }])
  }

  create () {
  }

  render () {

  }
  drawFrame(){
    
  }
}
