const ManagerEmitter = require('./manager-emitter')
const managerEvents = require('./manager-events')

class Manager {
  constructor(token, ws, wssEmitter) {
    this.token = token
    this._ws = ws
    this._createWSEventListener()

    this.messageEvents = require('./message-events')

    this.wssEmitter = wssEmitter
    this.managerEmitter = new ManagerEmitter()
  }

  _createWSEventListener() {
    this._ws.on('message', managerEvents.onMessage.bind(this))
    this._ws.on('close', managerEvents.onClone.bind(this))
  }

  on(event, func) {
    this.messageEvents[event] = func
  }

  send(event, data) {
    this._ws.send( JSON.stringify({
      event,
      data
    }) )
  }
}

module.exports = Manager