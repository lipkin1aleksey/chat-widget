import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../../../services/web-socket.service";
import { log } from 'util';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  messages = [];

  constructor(private ws: WebSocketService) {}

  ngOnInit() {
    this.ws.dialog$
      .subscribe((data: object[]) => {
          this.messages = data || [];
        }
      );

    this.ws.lastMessage$
      .subscribe( (data:any) => {
        if(this.ws.activeUser.id === data.token)
          this.messages.push(data.message)
      });
  }

}
