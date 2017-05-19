import io from 'socket.io-client'
export class Client{
    constructor(socketAdress){
        this.socket = io(socketAdress)        
    }
    initGame (){
        this.socket.emit("sv_init_game", "")
    }
}
    