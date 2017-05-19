import Player from './Player'
export class Human extends Player {

  constructor (option = {}) {
    super(option)
    this.type = 1
  }
  _onPressItem(location){
    this.selectItem(location)
  }
}
