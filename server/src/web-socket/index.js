const WSConfigClient = require('../config/ws-config-client')
const WSConfigManager = require('../config/ws-config-manager')

const WebSocketServer = require('ws').Server

const WSSEmitter = require('./wss-emitter')
const WSClientEvents = require('./ws-client-events')
const WSManagerEvents = require('./ws-manager-events')

const Manager = require('./manager')

class WSServet {
  constructor() {
    this._wssClient = new WebSocketServer(WSConfigClient)
    this._wssManager = new WebSocketServer(WSConfigManager)
    this.setWssEvents()

    this.clientAmount = new Map()
    this.clients = new Map()
    // this.clients = []
    
    // this.managers = new Map()
    this.managers = []

    this.wssEmitter = new WSSEmitter(this)
  }

  setWssEvents() {
    this._wssClient.on('connection', WSClientEvents.onConnection.bind(this))
    this._wssManager.on('connection', WSManagerEvents.onConnection.bind(this))
  }

  // addClient(ws) {
  //   this.clients.push( new Client(null, ws, this.wssEmitter) )
  // }

  addManager(ws) {
    this.managers.push( new Manager(null, ws, this.wssEmitter) )
  }

  setClient(token, client) {
    this.clients.set(token, client)
  }
  getClient(token) {
    this.clients.get(token)
  }
  removeClient(token) {
    this.clients.delete(token)
  }

  /*_generateToken() {
    var token

    do {
      token = Math.random().toString(36).substring(2, 8)
    } while ( this.clients.has(token) )

    return token
  }*/
}

module.exports = WSServet