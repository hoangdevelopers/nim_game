/* globals __DEV__ */
import Phaser from 'phaser'
import Item from '../sprites/Item'
import { centerGameObjects, initText, initTextFloatLeft } from '../utils'
export default class extends Phaser.State {
  init () {
    this.game.data.itemGroup = this.add.group()
  }
  preload () {
    // this.titleText = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.lang.GAME)
    // initText([{
    //   context: this.titleText,
    //   font: this.game.value.font.logo,
    //   fontSize: 40,
    //   fill: this.game.value.color.text,
    //   smoothed: false
    // }])
    
    this.drawFrame()
    this.game.data.heaps.forEach((element, index)=>{
      this.drawHeap (element, index)
    })
  }

  create () {
  }

  render () {

  }
    
  drawFrame () {
    this.view = {}
    this.view.background = this.add.image(0, 0, 'gameFrame')
    this.view.background.width = this.game.width
    this.view.background.height = this.game.height
    this.view.ruleDesc = this.add.text(10, 325,  this.game.data.rule.desc)
    
    initTextFloatLeft([{
      context: this.view.ruleDesc,
      font: this.game.value.font.primary,
      fontSize: 15,
      fill: this.game.value.color.text,
      smoothed: false
    }])

    for ( let i = 0; i < this.game.data.amount; i++){
      let index = this.add.text (10, i*70+20, i)
      initTextFloatLeft([{
        context: index,
        font: this.game.value.font.primary,
        fontSize: 25,
        fill: this.game.value.color.text,
        smoothed: false
      }])
    }
  }

  drawHeap (element, index) {
    for (let i = 0; i < element; i++){
      this.drawItem(i, index)
    }
  }
  
  drawItem (x, y) {
    let item = this.game.data.itemGroup.create(50*x+40, 70*y+20, 'item')
    //item.frame = frame
    item.inputEnabled = true;
    // item.events.onInputUp.add(this._onPressCandy, this)
    // item.events.onInputOver.add(this._onHoverCandy, this)
    // item.events.onInputOut.add(this._onOutCandy, this)
    //item. = i
  }
}
