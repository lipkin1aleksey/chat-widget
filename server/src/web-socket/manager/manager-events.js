module.exports = {
  onMessage: function(event) {
    const data = JSON.parse(event)
      
    this.messageEvents[data.event](this)
  },
  onOpen: function(event) {
    
  },
  onError: function(event) {
    
  },
  onClone: function(event) {
    console.log('-user')
  }
}