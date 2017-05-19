/* globals __DEV__ */
import Phaser from 'phaser'
import Item from '../sprites/Item'
import {Human, AI, Server} from '../player'
import { centerGameObjects, initText, initTextFloatLeft } from '../utils'
export default class extends Phaser.State {
  init () {
    this.game.data.itemGroup = this.add.group()
    this.game.data.playerGroup = new Array()
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
    
    
  }

  create () {
    this.drawFrame()
    this.initPlayer()
    
    this.game.data.heaps.forEach((element, index)=>{
      this.drawHeap (element, index)
    })
  }

  render () {

  }
  
  update () {
    if ( this.isWin() && !this.game.data.finish) {
      
      var notifiString = this.getCurrentPlayer().getName() + " thắng!"
      this.notifi(notifiString)
      this.game.data.logs.push(notifiString)
      this.game.data.finish = 1
      this.state.start('Info')
      
    }
    if (this.getCurrentPlayer().getName() === 'Computer') this.getCurrentPlayer()._onPressItem()
  }
  initPlayer () {
    var me = new Human({name: 'Me', state: this})
    if(this.game.data.type === "PLAY_WITH_COMPUTER") var player = new AI({name: 'Computer', state: this})
    else if(this.game.data.type === "PLAY_WITH_HUMAN") var player = new Server({name: 'Someone', state: this})
    this.game.data.playerGroup.push( me )
    this.game.data.playerGroup.push( player )
    this.getCurrentPlayer().playing()
  }
  drawFrame () {
    this.view = {}
    this.view.background = this.add.image(0, 0, 'gameFrame')
    this.view.background.width = this.game.width
    this.view.background.height = this.game.height
    this.view.ruleDesc = this.add.text(10, 325,  this.game.data.rule.desc)
    this.view.notifi = this.add.text(10, 345, '')
    this.view.playerName = this.add.text(620, 10, '')
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
    },  {
      context: this.view.playerName,
      font: this.game.value.font.primary,
      fontSize: 15,
      fill: this.game.value.color.info,
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
    item.events.onInputUp.add(this._onPressItem.bind(this), this)
    item.events.onInputOver.add(this._onHoverItem.bind(this), this)
    item.events.onInputOut.add(this._onOutItem.bind(this), this)
    item.location = {
      heap: y,
      index: x
    }
  }
  delay(cb, time){
    var timmer = this.game.time.create( true)
    timmer.add(time, cb, this)
    timmer.start()
  }
  notifi(string, time = 2000) {
    this.view.notifi.setText(string)
    this.delay(this.removeNotifi, time)
  }

  removeNotifi(){
    console.log("Remove notifi")
    this.view.notifi.setText('')
  //  this.game.data.timerNotifi.destroy();
  }

  _onPressItem ( item ) {
    this.getCurrentPlayer()._onPressItem(item.location)
  }

  _onHoverItem (item) {
    item.scale.setTo(1.2)
  }

  _onOutItem (item) {
    item.scale.setTo(1)
  }

  getCurrentPlayer(){
    return this.game.data.playerGroup[this.game.data.playing]
  }

  // playAble(name = ''){
  //   return name === this.getCurrentPlayer().name
  // }
  pickItem( location ){
    //this.data.candyAudio.play()
    var notifiString = '',
        count = 0
    this.game.data.itemGroup.forEach(function(element){
      if ( element.location.heap === location.heap && element.location.index >= location.index && element.visible) {
        element.visible = false
        count++
      }
    }, this)
    notifiString = `${this.getCurrentPlayer().getName()} : lấy ${count} item ở hàng ${location.heap}`
    this.game.data.logs.push(notifiString)
    this.notifi(notifiString)
    if ( !this.isWin() ){
      this.endTurn()
    }
    
  }

  endTurn () {
    this.getCurrentPlayer().stop()
    this.game.data.playing = 1 - this.game.data.playing
    if( this.getCurrentPlayer().getName() === 'Computer' ){
      this.delay( ()=>
      {
        this.getCurrentPlayer().playing()
      }, 1500)
    }
    else{
      this.getCurrentPlayer().playing()
    }
    
  }

  isWin(){
    return this.getItemVisiable().list.length === 0 
  }

  getItemVisiable(){
    return this.game.data.itemGroup.filter((child, index, childrenel)=>{
      return child.visible
    }, true)
  }
}
