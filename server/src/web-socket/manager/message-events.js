const db = require('../../database')

module.exports = {
  'getDialog': function(data) {
    db.getDialog(data.token)
      .then( dialog => {
        this.send('getDialog', { dialog })
      })
  },
  'addMessage': function(data) {
    db.addMessage( data.token, data.text, 1 )
      .then( message => {
        this.wssEmitter.emit('managerAddMessage', {
          message,
          client: data.token
        })
      })
  },
  // 'sendLastMessage': function(data) {
  // }
}
