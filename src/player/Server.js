import Player from './Player'
export class Server extends Player {
 
  constructor (option = {}) {
    super(option)
    this.type = 0
    this.state.game.client.socket.on('sv_select_item', (location)=>{
      console.log(location)
      this.state.pickItem(location)
    })
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