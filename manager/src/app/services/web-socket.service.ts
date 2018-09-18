import { Injectable } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';

import { messageEvents } from './helpers/messageEvents';
import { address, port } from '../config/web-socket';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws = new WebSocket("ws://" + address  + ':' + port)
  messageEvents = messageEvents
  
  clients$ = new Subject()
  dialog$ = new Subject()
  lastMessage$ = new Subject()

  messageEvent$ = fromEvent(this.ws, "message")

  constructor() {
    this._setWsEvents()
  }

  _setWsEvents() {
    this.messageEvent$
      .subscribe( 
        (event: any) => { 
          const data = JSON.parse(event.data)

          this.messageEvents[data.event].call(this, data.data)
        })

    this.ws.onopen = () => {
      // this.send('getDialog', { token: 'qrzihx' })
      // this.send('getAllClients')
    }

    this.ws.onclose = () => {
      alert('Not Catched error')
  
      throw new Error('Not Catched error')
    }

    this.ws.onerror = () => {
      alert('Close the contection with server')
      
      throw new Error('Close the contection with server')
    }
  }

  on(event, func) {
    this.messageEvents[event] = func
  }

  public send(event, data?) {
    this.ws.send( JSON.stringify({
      event,
      data
    }) )    
  }
}
