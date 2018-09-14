module.exports = {
  onConnection: function(ws) {
    console.log('user+') // can delete

    this.wssEmitter.emit('addManager', ws)
  }
}