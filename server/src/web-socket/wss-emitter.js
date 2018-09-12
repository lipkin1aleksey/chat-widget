const EventEmitter = require('events').EventEmitter

class WSSEmitter extends EventEmitter{
  constructor(wss) {
    super()

    this.wss = wss
    this._setEvents()
  }

  _setEvents() {
    this.on('addManager', this.wss.addManager.bind(this.wss))
    this.on('managerAddMessage', (data) => {
      // this.wss.getClient
      // this.send('getLastMessage', data)
    })

    this.on('addClient', this.wss.setClient.bind(this.wss))
    this.on('clientAddMassage', (data) => {
      
      // this.send('getLastMessage', data)
    })
    this.on('removeClient', this.wss.removeClient.bind(this.wss))
  }
}

module.exports = WSSEmitter