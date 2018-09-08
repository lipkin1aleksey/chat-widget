const VisiterEmitter = require('./emitter/visiter-emitter')
const messageEvents = require('./events/messageEvents')

class Visiter {
  constructor(token, ws, wssEmitter) {
    this.token = token
    this._ws = ws
    this._createWSEventListener()

    this.wssEmitter = wssEmitter
    this.visiterEmitter = new VisiterEmitter()
  }

  _createWSEventListener() {
    this._ws.on('message', event => {
      const data = JSON.parse(event)
      
      messageEvents[data.event](this)
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