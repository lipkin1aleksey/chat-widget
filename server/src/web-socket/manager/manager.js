const managerEvents = require('./events')

class Manager {
  constructor(ws, wssEmitter) {
    this._ws = ws
    this._createWSEventListener()

    this.messageEvents = require('./message-events')

    this.wssEmitter = wssEmitter
  }

  _createWSEventListener() {
    this._ws.on('message', managerEvents.onMessage.bind(this))
    this._ws.on('close', managerEvents.onClone.bind(this))
  }

  on(event, func) {
    this.messageEvents[event] = func
  }

  send(event, data) {
    console.log(`send -> ( event: "${event}" ) `)  //
    this._ws.send( JSON.stringify({
      event,
      data
    }) )
  }
}

module.exports = Manager