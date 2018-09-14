const Client = require('./client/client')

module.exports = {
  onConnection: function(ws) {
    console.log('user+') // can delete

    new Client(ws, this.wssEmitter)
  }
}