import Player from './Player'
export class AI extends Player {

  constructor (option = {}) {
    super(option)
    this.type = 1
  }
  _onPressItem(){
    var location = this.state.game.data.scriptAI(this.state.game.data)
    if(location) 
    this.selectItem(location)
  }
}
