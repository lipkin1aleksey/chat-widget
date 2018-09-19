import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../../../services/web-socket.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  message: string;

  constructor(private ws: WebSocketService) {
  }

  ngOnInit() {
  }

  sendMessage() {
    console.log('$mess', this.message);
    console.log('$id', this.ws.activeUser.id);
    this.ws.send('addMessage', {token: this.ws.activeUser.id, text: this.message});
    this.message = '';
  }
}
