/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects, initText } from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.playWithComputerBtn = this.add.button(this.world.centerX, this.world.centerY + 20, 'playWithComputerBtn', this._pressPlayWithComputer, this, 1, 0, 2);
    this.playWithHumanBtn = this.add.button(this.world.centerX, this.world.centerY + 60, 'playWithHumanBtn', this._pressPlayWithHuman, this, 1, 0, 2);
    this.titleText = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.value.game)
    initText([{
      context: this.titleText,
      font: this.game.value.font.logo,
      fontSize: 40,
      fill: this.game.value.color.text,
      smoothed: false
    }])
    centerGameObjects([this.playWithComputerBtn, this.playWithHumanBtn])
  }

  create () {
  }

  render () {
  }
  
  _pressPlayWithComputer () {
    this.game.data.type = "PLAY_WITH_COMPUTER"
    this.state.start('InitGame')

  }
  _pressPlayWithHuman(){
    this.game.data.type = "PLAY_WITH_HUMAN"
    this.game.client.initGame();
    this.state.start('InitGame')
  }
}
