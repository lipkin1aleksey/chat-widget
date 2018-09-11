const EventEmitter = require('events').EventEmitter

class WSSEmitter extends EventEmitter{
  constructor() {
    super()

    this._setEvents()
  }

  _setEvents() {
    // this.on('', this._playVsBotListener.bind(this))
  }
}

module.exports = WSSEmitter