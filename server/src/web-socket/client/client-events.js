module.exports = {
  onMessage: function(event) {
    const data = JSON.parse(event)
    console.log(`on -> ( event: "${data.event}" ) `)  //    

    this.messageEvents[data.event].call(this, data.data)
  },
  onOpen: function(event) {
    
  },
  onError: function(event) {
    
  },
  onClone: function() {
    console.log('-user')

    this.wssEmitter.emit( 'removeClient', this.getToken() )
  }
}