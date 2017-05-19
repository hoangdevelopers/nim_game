/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects, initText, initTextFloatLeft } from '../utils'
export default class extends Phaser.State {
  init () {
  }
  preload () {
  }

  create () {
    this.drawFrame()
    this.game.data.heaps.forEach((element, index)=>{
      this.drawHeap (element, index)
    })
  }

  render () {

  }
  
  update () {

  }

  drawFrame () {
    this.view = {}
    this.view.background = this.add.image(0, 0, 'gameFrame')
    this.view.background.width = this.game.width
    this.view.background.height = this.game.height
    this.view.ruleDesc = this.add.text(10, 325,  this.game.data.rule.desc)
    this.view.notifi = this.add.text(10, 345, '')
    initTextFloatLeft([{
      context: this.view.ruleDesc,
      font: this.game.value.font.primary,
      fontSize: 15,
      fill: this.game.value.color.text,
      smoothed: false
    },  {
      context: this.view.notifi,
      font: this.game.value.font.primary,
      fontSize: 15,
      fill: this.game.value.color.info,
      smoothed: false
    }])

    for ( let i = 0; i < this.game.data.logs; i++){
      let index = this.add.text (10, i*70+20, i)
      initTextFloatLeft([{
        context: index,
        font: this.game.value.font.primary,
        fontSize: 25,
        fill: this.game.value.color.text,
        smoothed: false
      }])

    }
    this.game.data.logs.forEach(function(element, index){
        let log = this.add.text (10, index*20+20, element)
        initTextFloatLeft([{
            context: log,
            font: this.game.value.font.primary,
            fontSize: 10,
            fill: this.game.value.color.text,
            smoothed: false
        }])
    }, this)
  }

  drawHeap (element, index) {
    var text = this.add.text(620, index*20+20, `Đống ${index} có ${element} item`)
    initTextFloatLeft([{
        context: text,
        font: this.game.value.font.primary,
        fontSize: 12,
        fill: this.game.value.color.text,
        smoothed: false
      }])
  }
  
}
