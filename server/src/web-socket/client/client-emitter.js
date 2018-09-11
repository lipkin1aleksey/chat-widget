const EventEmitter = require('events').EventEmitter

class ClientEmitter extends EventEmitter{
  constructor() {
    super()

    this._setEvents()
  }

  _setEvents() {
    // this.on('', this._playVsBotListener.bind(this))
  }
}

module.exports = ClientEmitter