const WSConfig = require('../config/ws-server')

const WebSocketServer = require('ws').Server

const WSSEmitter = require('./emitter/wss-emitter')
const Visiter = require('./visiter')

class WSServet {
  constructor() {
    this._wss = new WebSocketServer(WSConfig)
    this.setWssEvents()
    this.visiters = new Map()

    this.wssEmitter = new WSSEmitter()
  }

  setWssEvents() {
    this._wss.on('connection', ws => {
      console.log('user+') // can delete
      
      this._addVisiter(ws)
    })
  }

  _addVisiter(ws) {
    var token = this._generateToken()

    var newVisiter = this.visiters
      .set(token, new Visiter(token, ws, this.wssEmitter))
      .get(token)

    return newVisiter
  }

  _generateToken() {
    var token

    do {
      token = Math.random().toString(36).substring(2, 8)
    } while ( this.visiters.has(token) )

    return token
  }
}

module.exports = WSServet