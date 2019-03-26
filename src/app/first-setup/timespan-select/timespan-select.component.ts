import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timespan-select',
  templateUrl: './timespan-select.component.html',
  styleUrls: ['./timespan-select.component.scss'],
})
export class TimespanSelectComponent implements OnInit {

  weeks = "";

  @Input() setupData;

  constructor() { }

  ngOnInit() {}

  valueChanged() {
    this.setupData.timeInPast = this.weeks;
  }
}
