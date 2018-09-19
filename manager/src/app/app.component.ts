import { Component, OnInit } from '@angular/core';

import { WebSocketService } from './services/web-socket.service'
import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'manager';

  constructor(private ws:WebSocketService) {}

  ngOnInit() {
    //setTimeout( () => this.ws.send('getAllClients', {}), 1 )
    // setTimeout( () => this.ws.send('getAllClients', {}), 100 )
    //setTimeout( () => this.ws.send('getDialog', { token: 'qrzihx' }), 100 )
    //setTimeout( () => this.ws.send('addMessage', { token: 'qrzihx', text: 'something' }), 100 )

  }
}
