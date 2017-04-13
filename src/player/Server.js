export default class Player {
 
  constructor ({ name, type , state}) {
    this.name = name
    this.type = type
    this.state = state
    this.status = {
        do: Player.status.STOP
    }
  }
//   _onPressItem(location){
//     console.log("The player who is playing is'nt human")
//   }
//   _onPressCandy(){
      
//   }
//   playing(){
//       this.status.do = Player.status.PLAYING
//   }
//   stop(){
//       this.status.do = Player.status.STOP
//   }
//   endTurn(){
//       if(this.status.do === Player.status.PLAYING)
//       this.state.endTurn()
//   }
}
Player.status = {
    PLAYING : 1,
    PENDING :2,
    STOP: 3
  }