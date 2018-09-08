import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  messages = [];
  constructor() {
    this.messages = [
      {'sender': 'client',
      'text': 'Хочу купить рамку планетарий'
      },
      {'sender': 'manager',
      'text': 'Очень хорошо, 9 тысяч'
      },
    ];
  }

  ngOnInit() {
  }

}
