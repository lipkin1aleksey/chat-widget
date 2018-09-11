module.exports = {
  onMessage: function(event) {
    const data = JSON.parse(event)
      
    this.messageEvents[data.event].bind(this)(data.data)
  },
  onOpen: function(event) {
    
  },
  onError: function(event) {
    
  },
  onClone: function(event) {
    console.log('-user')
  }
}