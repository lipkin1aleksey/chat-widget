const WSConfigClient = require('../config/ws-config-client')
const WSConfigManager = require('../config/ws-config-manager')

const WebSocketServer = require('ws').Server

const WSSEmitter = require('./wss-emitter')
const WSClientEvents = require('./ws-client-events')
const WSManagerEvents = require('./ws-manager-events')

const Manager = require('./manager/manager')

class WSServet {
  constructor() {
    this._wssClient = new WebSocketServer(WSConfigClient)
    this._wssManager = new WebSocketServer(WSConfigManager)
    this.setWssEvents()

    this.clients = new Map()
    this.managers = []

    this.wssEmitter = new WSSEmitter(this)
  }

  setWssEvents() {
    this._wssClient.on('connection', WSClientEvents.onConnection.bind(this))
    this._wssManager.on('connection', WSManagerEvents.onConnection.bind(this))
  }

  addManager(ws) {
    this.managers.push( new Manager(ws, this.wssEmitter) )
  }
  getManagers() {
    return this.managers
  }
  removeManager(manager) {
    this.managers.splice( this.managers.indexOf(manager), 1 )
  }

  addClient(token, client) {
    if(!this.clients.has(token))
      this.clients.set(token, [client])
    else
      this.clients.get(token).push(client)
  }
  getClients(token) {
    return this.clients.get(token)
  }
  removeClient(token, client) {
    var clients = this.clients.get(token)

    if(clients.length > 1) {
      clients.splice( clients.indexOf(client), 1 )
    } else 
      this.clients.delete(token)
  }
}

module.exports = WSServet