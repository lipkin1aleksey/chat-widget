const db = require('../../database')

module.exports = {
  'getDialog': function(data) {
    db.getDialog(+data.token)
      .then( dialog => {
        this.send('getDialog', { dialog })
      })
  },
  'addClient': function(data) {
    db.addUser( data.name, generateToken() )
  },
  'addMessage': function(data) {
    db.addMessage( +data.token, data.text, 1 )
      .then(  )
  }
}
