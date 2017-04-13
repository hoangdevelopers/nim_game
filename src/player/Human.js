import Player from './Player'
export default class extends Player {

  constructor (option = {}) {
    super(option)
  }
  _onPressItem(location){
    this.selectItem(location)
  }
}
