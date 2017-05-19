import Phaser from 'phaser'
import { centerGameObjects, initText } from '../utils'
import ruleFunc from '../gameplay/rules'
import scriptAI from '../gameplay/scriptAI'

export default class extends Phaser.State {
  init () {
    this.game.client.socket.on('sv_ready_play', (hostID)=>{
        this.game.data.hostID = hostID
        this.initData("PLAY_WITH_HUMAN");
    })
    this.game.client.socket.on('sv_generate_heap', (heaps)=>{
        this.game.data.heaps = heaps
        console.log(this.game.data.heaps)
        this.state.start("Game")
    })
    
    
  }

  preload () {
    this.loading = this.add.sprite(this.world.centerX - 20, this.world.centerY, 'mummy_spritesheet');
    this.loading.animations.add('walk');
    this.loading.animations.play('walk', 50, true);
    
    this.title = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.value.game)
    this.loadingText = this.add.text(this.world.centerX, this.world.centerY + 60, "Find a player..")
    initText([{
      context: this.title,
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
    
  }

  create () {
    if(this.game.data.type === "PLAY_WITH_COMPUTER"){
      this.initData("PLAY_WITH_COMPUTER")
    }
    
  }
  render(){

  }

  initData (type) {
    var min = 2, max = 8
    this.game.data.amount = 3,
    this.game.data.heaps = new Array()
    this.game.data.logs = new Array()
    this.game.data.rule = {
        desc: "Mỗi lượt bạn được lấy 2 Item bất kỳ trên 1 đống!",
        func: ruleFunc.nim1
      }
    this.game.data.scriptAI = scriptAI.script1
    this.game.data.finish = 0

    if(type === "PLAY_WITH_COMPUTER" ){
      this.game.data.playing = 0;
      this.game.data.heaps = this.generateHeap(min, max, this.game.data.amount)
      this.state.start('Game')
    }
    if(type === "PLAY_WITH_HUMAN"){
      if (this.game.data.id === this.game.data.hostID) {
        this.game.data.playing = 0
        this.game.data.heaps = this.generateHeap(min, max, this.game.data.amount)
        this.game.client.socket.emit("client_generate_heap", this.game.data.heaps)
        this.state.start("Game")
      }
      else if(this.game.data.id !== this.game.data.hostID) {
        this.game.data.playing = 1
      }
    }
    
  }
  
  generateHeap(min, max, amount) {
    var heaps = new Array()
    for (let i = 0; i < amount; i++){
      var rd = this.game.rnd.integerInRange(min, max)
      heaps.push(rd)
    }
    return heaps
  }
}
