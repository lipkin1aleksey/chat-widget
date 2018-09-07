const EventEmitter = require('events').EventEmitter
const visiterEvents = require('./visiterEvents')

class Visiter {
  constructor(token, ws, wssEmitter) {
    this.token = token
    this._ws = ws
    this._createWSEventListener()

    this._wssEmitter = wssEmitter
    this._visiterEmitter = new EventEmitter()
  }

  _createWSEventListener() {
    this._ws.on('message', event => {
      const data = JSON.parse(event)
      visiterEvents[data.event](this)
    })

    this._ws.on('close', () => console.log('-user'))
  }

  send(event, data) {
    this._ws.send( JSON.stringify({
      event,
      data
    }) )
  }
}

module.exports = Visiter