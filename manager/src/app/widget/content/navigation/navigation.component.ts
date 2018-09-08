import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  users: User[] = [];
  constructor() {
    this.users.push({name: 'Aleksey'});
    this.users.push({name: 'Peter'});
    this.users.push({name: 'Василий'});
   }

  ngOnInit() {
  }

}
