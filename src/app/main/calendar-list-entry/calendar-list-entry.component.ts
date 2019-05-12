import { Component, OnInit, Input } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';

@Component({
  selector: 'app-calendar-list-entry',
  templateUrl: './calendar-list-entry.component.html',
  styleUrls: ['./calendar-list-entry.component.scss'],
})
export class CalendarListEntryComponent implements OnInit {

  private _platformEvent: PlatformIndependentEvent = undefined
  @Input()
  set platformEvent(platformEvent: PlatformIndependentEvent) {
    this._platformEvent = platformEvent
    this.startDate = this.formatDate(new Date(platformEvent.startDate))
    this.endDate = this.formatDate(new Date(platformEvent.endDate))
    this.title = platformEvent.title
  }
  get nplatformEventme(): PlatformIndependentEvent { return this._platformEvent; }



  private _prediction: Number = 0
  @Input()
  set prediction(prediction: Number) {
    this._prediction = prediction
    
  }
  get prediction(): Number { return this._prediction; }
  


  startDate: String = undefined
  endDate: String = undefined
  title: String = ""

  constructor() { }
  ngOnInit() {} 

  private formatDate(date: Date): String {
    var dateResult = ""
    dateResult += this.addZero(date.getDate()) + "/"
    dateResult += this.addZero(date.getMonth() + 1) + "/"
    dateResult += this.addZero(date.getFullYear()) + " "
    
    dateResult += this.addZero(date.getHours()) + ":"
    dateResult += this.addZero(date.getMinutes())
    return dateResult
  }

  private addZero(number) {
    if(number < 10) {
      return "0" + number
    }
    return "" + number
  }


}
