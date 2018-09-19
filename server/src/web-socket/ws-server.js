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
    this._wssClient.on('error', e => console.error(e) )
    this._wssManager.on('error', e => console.error(e) )
  }

  addManager(ws) {
    this.managers.push( new Manager(ws, this.wssEmitter) )
    console.log(this.managers.length) //
  }
  getManagers() {
    return this.managers
  }
  removeManager(manager) {
    this.managers.splice( this.managers.indexOf(manager), 1 )
    console.log(this.managers.length) //
  }

  addClient(token, client) {
    if(!this.clients.has(token))
      this.clients.set(token, [client])
    else
      this.clients.get(token).push(client)
    
    if( this.clients.has(token) ) //
      console.log( this.clients.get(token).length )
    else
      console.log('0')  
  }
  getClients(token) {
    return this.clients.get(token)
  }
  removeClient(token, client) {
    if(this.clients.get(token) && this.clients.get(token).length > 1) {
      this.clients.get(token).splice( this.clients.get(token).indexOf(client), 1 )
    } else 
      this.clients.delete(token)
    
    if( this.clients.has(token) ) //
      console.log( this.clients.get(token).length )
    else
      console.log('0')    
  }
}

module.exports = WSServet