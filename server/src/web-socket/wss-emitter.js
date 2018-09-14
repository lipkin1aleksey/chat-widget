const EventEmitter = require('events').EventEmitter

class WSSEmitter extends EventEmitter{
  constructor(wss) {
    super()

    this.wss = wss
    this._setEvents()
  }

  _setEvents() {
    this.on('addClient', this.wss.addClient.bind(this.wss))
    this.on('removeClient', this.wss.removeClient.bind(this.wss))

    this.on('addManager', this.wss.addManager.bind(this.wss))
    this.on('removeManager', this.wss.removeManager.bind(this.wss))

    this.on('addMassage', (data) => {
      this.wss.getClients(data.token).forEach(client => client.send('getLastMessage', data))
      this.wss.getManagers(data.token).forEach(manager => manager.send('getLastMessage', data)) 

    })
  }
}

module.exports = WSSEmitter