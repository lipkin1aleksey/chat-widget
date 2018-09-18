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
    setTimeout( () => this.ws.send('getAllClients', {}), 1000 )
    setTimeout( () => this.ws.send('getDialog', { token: 'qrzihx' }), 1000 )

    this.ws.clients$.subscribe( data => console.log('1', data))
    this.ws.dialog$.subscribe( data => console.log('2', data))
    this.ws.lastMessage$.subscribe( data => console.log('3', data))
  }
}
