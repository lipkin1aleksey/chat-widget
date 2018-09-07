const WSConfig = require('../config/ws-server')

const WebSocketServer = require('ws').Server
const EventEmitter = require('events').EventEmitter

const Visiter = require('./visiter')

class WSServet {
  constructor() {
    this._wss = new WebSocketServer(WSConfig)
    this.setWssEvents()

    this._wssEmitter = new EventEmitter()
    this._setEvents()

    this.visiters = new Map()
  }

  setWssEvents() {
    this._wss.on('connection', ws => {
      console.log('user+') // can delete
      
      var visiter = this._addVisiter(ws)
      visiter.send('reqToken', {token: visiter.token})
    })
  }

  _addVisiter(ws) {
    var token = this._generateToken()

    var newVisiter = this.visiters
      .set(token, new Visiter(token, ws, this._wssEmitter))
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

  _setEvents() {
    // this._wssEmitter.on('', this._playVsBotListener.bind(this))
  }
}

module.exports = WSServet