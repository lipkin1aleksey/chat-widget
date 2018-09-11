module.exports = {
  onConnection: function(ws) {
    console.log('user+') // can delete

    this.addClient(ws)
    // this.wssEmitter.emit('addClient', ws)
  }
}