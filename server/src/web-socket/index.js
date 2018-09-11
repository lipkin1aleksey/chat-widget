const WSConfig = require('../config/ws-server')

const WebSocketServer = require('ws').Server

const WSSEmitter = require('./wss-emitter')
const WSSEvents = require('./wss-events')

const Client = require('./client')

class WSServet {
  constructor() {
    this._wss = new WebSocketServer(WSConfig)
    this.setWssEvents()

    // this.clients = new Map()
    this.clients = []
    
    // this.managers = new Map()
    this.managers = []

    this.wssEmitter = new WSSEmitter(this)
  }

  setWssEvents() {
    this._wss.on('connection', WSSEvents.onConnection.bind(this))
  }

  addClient(ws) {
    this.clients.push( new Client(null, ws, this.wssEmitter) )
  }

  /*_addClient(ws) {
    var token = this._generateToken()

    var newClient = this.clients
      .set(token, new Client(token, ws, this.wssEmitter))
      .get(token)
    
    return newClient
  }

  _generateToken() {
    var token

    do {
      token = Math.random().toString(36).substring(2, 8)
    } while ( this.clients.has(token) )

    return token
  }*/
}

module.exports = WSServet