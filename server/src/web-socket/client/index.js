// const ClientEmitter = require('./client-emitter')
const clientEvents = require('./client-events')

class Client {
  constructor(ws, wssEmitter) {
    this._token
    this._ws = ws
    this._createWSEventListener()

    this.messageEvents = require('./message-events')

    this.wssEmitter = wssEmitter
    // this.clientEmitter = new ClientEmitter()
  }

  getToken() {
    return this._token
  }
  setToken(token) {
    this._token = token
  }

  _createWSEventListener() {
    this._ws.on('message', clientEvents.onMessage.bind(this))
    this._ws.on('close', clientEvents.onClone.bind(this))
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

module.exports = Client