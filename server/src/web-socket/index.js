const WSConfig = require('../config/ws-server')

const WebSocketServer = require('ws').Server

const WSSEmitter = require('./wss-emitter')
const WSSEvents = require('./wss-events')

const Client = require('./client')

class WSServet {
  constructor() {
    this._wss = new WebSocketServer(WSConfig)
    this.setWssEvents()

    this.clients = new Map()
    this.managers = new Map()

    this.wssEmitter = new WSSEmitter()
  }

  setWssEvents() {
    this._wss.on('connection', WSSEvents.onConnection.bind(this))
  }

  _addClient(ws) {
    var token = this._generateToken()

    var newClient = this.clients
      .set(token, new Client(token, ws, this.wssEmitter))
      .get(token)
      
      newClient.on('start', (visiter) => {
        visiter.send('getToken', { token: visiter.token })
      })

    return newClient
  }

  _generateToken() {
    var token

    do {
      token = Math.random().toString(36).substring(2, 8)
    } while ( this.clients.has(token) )

    return token
  }
}

module.exports = WSServet