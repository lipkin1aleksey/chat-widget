export default {
  onMessage: function(event) {
    const data = JSON.parse(event.data);
      
    this.messageEvents[data.event].call(this, data.data)
  },
  onOpen: function(event) {
    this.sent('getToken', { token: localStorage.getItem( 'tokem' ) })
  },
  onError: function(event) {
    alert('Not Catched error')
    throw new Error('Not Catched error')
  },
  onClone: function(event) {
    alert('Close the contection with server')
    throw new Error('Close the contection with server')
  }
}