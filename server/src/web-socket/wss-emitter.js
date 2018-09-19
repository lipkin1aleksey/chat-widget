const EventEmitter = require('events').EventEmitter

class WSSEmitter extends EventEmitter{
  constructor(wss) {
    super()

    this.wss = wss
    this._setEvents()
  }

  _setEvents() {
    this.on('addClient', this.wss.addClient.bind(this.wss))
    this.on('addNewClient', (name, token, client) => {
      this.wss.addClient.call(this.wss, token, client)
      
      if( this.wss.getManagers() )
        this.wss.getManagers().forEach(manager => manager.send('getNewClient', { 
          token,
          name
        })) 
    })
    this.on('removeClient', this.wss.removeClient.bind(this.wss))

    this.on('addManager', this.wss.addManager.bind(this.wss))
    this.on('removeManager', this.wss.removeManager.bind(this.wss))

    this.on('addMassage', (data) => {
      if( this.wss.getClients(data.token) )
        this.wss.getClients(data.token).forEach(client => client.send('getLastMessage', data))
        
      if( this.wss.getManagers() )
        this.wss.getManagers().forEach(manager => manager.send('getLastMessage', { 
          token: data.token,
          message: data
        })) 
    })
  }
}

module.exports = WSSEmitter