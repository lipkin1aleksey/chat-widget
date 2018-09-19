module.exports = {
  onMessage: function(event) {
    const data = JSON.parse(event)
    console.log(`on -> ( event: "${data.event}" ) `)  //
      
    this.messageEvents[data.event].bind(this)(data.data)
  },
  onOpen: function(event) {
    
  },
  onError: function(e) {
    console.error(e)
  },
  onClone: function(event) {
    console.log('-user')

    this.wssEmitter.emit('removeManager', this )
  }
}