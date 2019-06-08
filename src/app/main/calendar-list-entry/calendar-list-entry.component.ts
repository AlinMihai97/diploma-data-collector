import { Component, OnInit, Input } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';
import { Router } from '@angular/router';

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
    this.timeInterval = this.processDateIntervalForEvent(platformEvent)
    this.title = platformEvent.title
  }
  get nplatformEventme(): PlatformIndependentEvent { return this._platformEvent; }



  private _prediction: Number = 0
  @Input()
  set prediction(prediction: Number) {
    this._prediction = prediction

  }
  get prediction(): Number { return this._prediction; }



  timeInterval: String = ""
  title: String = ""

  constructor(private router: Router) { }
  ngOnInit() { }

  private goToEventDetail() {
    this.router.navigateByUrl("/event-view/" + this._platformEvent.event_id)
  }

  private processDateIntervalForEvent(platformEvent: PlatformIndependentEvent) {
    let returnedInterval = ""
    let startDate = new Date(platformEvent.startDate)
    let endDate = new Date(platformEvent.endDate)


    returnedInterval += startDate.getHours() + ":" + this.getMinutesString(startDate.getMinutes()) + " - "
    returnedInterval += endDate.getHours() + ":" + this.getMinutesString(endDate.getMinutes()) + " "
    returnedInterval += this.getTimeZoneStirng(endDate.getTimezoneOffset())

    return returnedInterval
  }

  private getMinutesString(minutes) {
    if (minutes < 10)
      return "0" + minutes

    return "" + minutes
  }

  private getTimeZoneStirng(offset) {
    let returnValue = "UTC"
    if (offset < 0) {
      returnValue += "+"
      offset = offset * -1
    } else {
      returnValue += "-"
    }

    return returnValue + Math.floor(offset / 60) + ":" + this.getMinutesString(offset % 60)
  }
}
