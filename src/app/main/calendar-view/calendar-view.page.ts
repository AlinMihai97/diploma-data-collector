import { Component, OnInit } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';


@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.page.html',
  styleUrls: ['./calendar-view.page.scss'],
})
export class CalendarViewPage implements OnInit {
  constructor() { }

  eventList = [
    {
      event: this.createMockPlatformEvent(),
      prediction: 100
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 101
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 102
    }
  ]

  ngOnInit() {
  }


  private createMockPlatformEvent(): PlatformIndependentEvent {
    var event = new PlatformIndependentEvent()
    event.title = "This is a very cool event"
    event.startDate = 1557677242373
    event.endDate = 1557697242373
    return event
  }
}
