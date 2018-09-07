import messageEvents from "./messageEvents"

class WSServer {
  constructor(address, port) {
    this.ws = new WebSocket("ws://" + address  + ':' + port)
    this.messageEvents = messageEvents
    this._setWsEvents()
  }

  _setWsEvents() {
    for (const eventName in messageEvents) {
      this.on(eventName, messageEvents[eventName])
    }

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data);
      
      this.messageEvents[data.event].call(this, data.data)
    }
  }

  on(event, func) {
    this.messageEvents[event] = func
  }

  send(event, data) {
    this.ws.send( JSON.stringify({
      event,
      data
    }) )    
  }
}

export default WSServer