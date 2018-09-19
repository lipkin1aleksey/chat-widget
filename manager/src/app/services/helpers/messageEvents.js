export const messageEvents = { // события, которые будут отлавливаться 
  'getDialog': function(data) {
    this.dialog$.next(data.dialog)
    console.log(data)
  },
  'getLastMessage': function(data) {
    this.lastMessage$.next(data.message)
  },
  'getAllClients': function(data) {
    this.clients$.next(data.clients)
  },
  'getNewClient': function(data) {
    this.newClient$.next(data)
  }
}