import { Component, OnInit } from '@angular/core';

import { log } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'manager';

  constructor() {}

  ngOnInit() {
  }
}
