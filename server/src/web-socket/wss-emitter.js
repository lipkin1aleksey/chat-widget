const EventEmitter = require('events').EventEmitter

class WSSEmitter extends EventEmitter{
  constructor(wss) {
    super()

    this.wss = wss

    this._setEvents()
  }

  _setEvents() {
    this.on('addClient', this.wss.addClient)
  }
}

module.exports = WSSEmitter