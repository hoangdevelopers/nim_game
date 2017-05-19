export default class Player {
 
  constructor ({ name, state}) {
    this.name = name
    this.state = state
    this.status = {
        do: Player.status.STOP
    }
  }
  _onPressItem(location){
    this.state.notifi("Không hợp lệ")
  }
  getName(){
      return this.name;
  }
  playing(){
      this.status.do = Player.status.PLAYING
      this.state.view.playerName.setText(this.state.getCurrentPlayer().getName())
  }
  stop(){
      this.status.do = Player.status.STOP
  }
  endTurn(){
      if(this.status.do === Player.status.PLAYING)
      this.state.endTurn()
  }
  selectItem(location){
    if(!location) return false
    var rule = this.state.game.data.rule.func;
    // Kiem tra nguoi choi co dung luot khong
    if (this.state.getCurrentPlayer().getName() != this.getName()){
        console.log ("current player not correct")
    }
    // Kiem tra trang thai player san sang
    if (this.status.do === Player.status.STOP) {
      console.log("status is STOP")
      return false
    }
    else if (this.status.do === Player.status.PENDING) {
      console.log("status is PENDING")
      return false
    }
    // status === PLAYING
    // Kiem tra luat choi
    else if (! rule(this.state.game.data, location)){
      this.state.notifi("Không hợp lệ")
      return false
    }
    this.state.pickItem(location)
    if(this.type) this.state.game.client.socket.emit("client_select_item", location)
    return true
  }
}
Player.status = {
    PLAYING : 1,
    PENDING :2,
    STOP: 3
  }