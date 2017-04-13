/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects, initText } from '../utils'
import ruleFunc from '../gameplay/rules'
import scriptAI from '../gameplay/scriptAI'
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
//    this._pressPlay()
  }
  initData () {
    this.game.data = {
      amount: 3, // max = 4 heap
      heaps: new Array,
      playing: 0,
      logs: new Array(),
      rule: {
        desc: "Mỗi lượt bạn được lấy 2 Item bất kỳ trên 1 đống!",
        func: ruleFunc.nim1
      },
      scriptAI: scriptAI.script1,
      finish: 0
    }
    for (let i = 0; i < this.game.data.amount; i++){
      var rd = this.game.rnd.integerInRange(2, 8)
      this.game.data.heaps.push(rd)
    }
  }
  _pressPlay () {
    this.initData()
    this.state.start('Game')

  }
}
