import Player from './Player'
export default class extends Player {

  constructor (option = {}) {
    super(option)
  }
  _onPressItem(){
    var location = this.state.game.data.scriptAI(this.state.game.data)
    this.selectItem(location)
  }
}
