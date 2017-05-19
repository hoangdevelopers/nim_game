import 'pixi'
import 'p2'
import Phaser from 'phaser'
import io from 'socket.io-client'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import InitGameState from './states/InitGame'
import GameState from './states/Game'
import MenuState from './states/Menu'
import InfoState from './states/Info'

import config from './config'
import value from './value'
import {Client} from './socket'
class Game extends Phaser.Game {

  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('InitGame', InitGameState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('Info', InfoState, false)
    this.value = value
    this.state.start('Boot')
    this.data = {}
    this.client = new Client(config.socketAdress)
    this.client.socket.on('sv_login', (id)=>{
        console.log("My id " + id)
        this.data.id = id
    })
  }
}

window.game = new Game()
