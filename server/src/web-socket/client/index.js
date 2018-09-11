const ClientEmitter = require('./client-emitter')
const clientEvents = require('./client-events')

class Client {
  constructor(token, ws, wssEmitter) {
    this.token = token
    this._ws = ws
    this._createWSEventListener()

    this.messageEvents = {}

    this.wssEmitter = wssEmitter
    this.clientEmitter = new ClientEmitter()
  }

  _createWSEventListener() {
    this._ws.on('message', clientEvents.onMessage.bind(this))
    this._ws.on('close', clientEvents.onClone.bind(this))
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

module.exports = Client