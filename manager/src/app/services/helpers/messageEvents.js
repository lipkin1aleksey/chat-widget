export const messageEvents = { // события, которые будут отлавливаться 
  'getDialog': function(data) {
    this.dialog$.next(data.dialog)
  },
  'getLastMessage': function(data) {
    this.lastMessage$.next(data.message)
  },
  'getAllClients': function(data) {
    this.clients$.next(data.clients)
  }
}