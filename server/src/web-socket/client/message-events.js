const db = require('../../database')
const generate = require('../generater')

module.exports = {
  'getDialog': function(data) {
    db.getDialog(data.token)
      .then( dialog => {
        this.send('getDialog', { dialog })
      })
  },
  'addClient': function(data) {
    var token
    do {
      token = generate.token()
    } while ( db.getUser(token).id )

    db.addUser( data.name, token )
    
    this.setToken(data.token)
    this.wssEmitter.emit('setClient', this)

    this.send('setToken', { token })
  },
  'continueDialog': function(data) {
    this.setToken(data.token)
    this.wssEmitter.emit('setClient', this)

    db.getDialog(data.token)
      .then( dialog => {
        this.send('getDialog', { dialog })
      })
  },
  'addMessage': function(data) {
    db.addMessage( data.token, data.text, 1 )
      .then( message => {
        this.wssEmitter.emit('clientAddMassage', {
          message,
          client: data.token
        })
      })
  }
}