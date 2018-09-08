import messageEvents from "./events/messageEvents"
import wsEvents from './events/wsEvents'

class WSServer {
  constructor(address, port) {
    this.ws = new WebSocket("ws://" + address  + ':' + port)
    this.messageEvents = messageEvents
    this._setWsEvents()
  }

  _setWsEvents() {
    this.ws.onmessage = wsEvents.onMessage.bind(this)
    this.ws.onopen = wsEvents.onOpen.bind(this)
    this.ws.onclose = wsEvents.onClone.bind(this)
    this.ws.onerror = wsEvents.onError.bind(this)
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