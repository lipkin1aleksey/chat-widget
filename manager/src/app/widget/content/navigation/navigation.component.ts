import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {WebSocketService} from "../../../services/web-socket.service";
import { log } from 'util';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  users: User[] = [];

  constructor(private ws: WebSocketService) { }

  ngOnInit() {
    this.ws.clients$
      .subscribe((data: object[]) => {
        data.forEach((elem: User) => {
          if (elem.id && elem.name) {
            this.users.push(new User(elem.name, elem.id));
          }
        })
      });

    this.ws.newClient$
      .subscribe( (data:any) => {
        this.users.push(new User(data.name, data.token))
      })
  }

  userClick(pUser: User) {
    this.users.forEach((elem: User) => {
      elem.active = false;
    });
    pUser.active = true;
    this.ws.activeUser = pUser;
    this.ws.send('getDialog', {token: pUser.id});
  }
}
