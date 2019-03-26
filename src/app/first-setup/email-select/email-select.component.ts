import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-select',
  templateUrl: './email-select.component.html',
  styleUrls: ['./email-select.component.scss'],
})
export class EmailSelectComponent implements OnInit {

  @Input() setupData;
  email = "";
  constructor() { }

  ngOnInit() {}

  valueChanged() {
    this.setupData.calendarEmail = this.email;
  }
}
