const Client = require('./client/index')

module.exports = {
  onConnection: function(ws) {
    console.log('user+') // can delete

    // this.addClient(ws)
    new Client(ws, this.wssEmitter)
  }
}