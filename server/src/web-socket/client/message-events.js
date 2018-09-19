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
    
    this.setToken(token)
    this.wssEmitter.emit('addNewClient', data.name, token, this)
    this.send('setToken', { token })
  },
  'continueDialog': function(data) {
    this.setToken(data.token)
    this.wssEmitter.emit('addClient', data.token, this)

    db.getDialog(data.token)
      .then( dialog => {
        this.send('getDialog', { dialog })
      })
  },
  'addMessage': function(data) {
    /*db.getUser(data.token)
      .then(user => {
        db.addMessage( data.token, data.text, {
          type: 'client',
          name: user.name
        })
          .then( message => {
            this.wssEmitter.emit('addMassage', {
              message,
              token: data.token
            })
          })
      })
    */

    db.getUser(data.token)
      .then(user => {
        return db.addMessage( data.token, data.text, {
          type: 'client',
          name: user.name
        })
      })
      .then( message => {
        this.wssEmitter.emit('addMassage', {
          message,
          token: data.token
        })
      })
    
  }
}