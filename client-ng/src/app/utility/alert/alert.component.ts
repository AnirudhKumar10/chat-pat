import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {

  constructor() {}

  flag = false;

  show(header, message) {
    this.flag = false;
    this.header = header;
    this.message = message;
  }

  header;
  message;

  hide() {
    this.flag = true;
  }
}
