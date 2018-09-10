module.exports = {
  onConnection: function(ws) {
    console.log('user+') // can delete

    this._addClient(ws)
  }
}