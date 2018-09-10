const DataBase = require('...')
var db = new DataBase()

var messageUser = {
  userId: 1,
  name: 'igor',
  message: 'something'
}
db.userMessage( messageUser )

var messageManager = {
  userId: 1,
  name: 'Stas',
  message: 'something'
}
db.menagerMessage( messageManager )

var userId = 19
var dialog = db.getDialog( userId )

// где
dialog = [
  {
    who: 'you',
    name: 'Igor',
    message: 'sss',
    date: // тип new Date().toJSON()
  },
  {
    who: 'menager',
    name: 'Stas',
    message: 'sss',
    date: // тип new Date().toJSON()
  }
]