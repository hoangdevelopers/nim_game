import Phaser from 'phaser'
import { centerGameObjects, initText } from '../utils'
import Item from '../sprites/Item'
export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.add.text(100, 100, "test")
    console.log("test")
    this.loading = this.add.sprite(this.world.centerX - 20, this.world.centerY, 'mummy_spritesheet');
    this.loading.animations.add('walk');
    this.loading.animations.play('walk', 50, true);
    
    this.title = this.add.text(this.world.centerX, this.world.centerY - 30, this.game.lang.GAME)
    this.loadingText = this.add.text(this.world.centerX, this.world.centerY + 60, this.game.lang.GAME_LOADING)
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
    
    //
    // load your assets
    //
    this.load.image('gameFrame', 'assets/images/frames/1.png')
    this.load.image('item', 'assets/images/items/coin36x36.png')
    this.load.spritesheet('playBtn', 'assets/images/buttons/play.png', 82, 28);
  }

  create () {
    // this.mushroom = new Item({
    //   game: this,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)
    this.state.start('Menu')
  }
  render(){

  }

}
