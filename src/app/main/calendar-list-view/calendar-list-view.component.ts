import { Component, OnInit } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';

@Component({
  selector: 'app-calendar-list-view',
  templateUrl: './calendar-list-view.component.html',
  styleUrls: ['./calendar-list-view.component.scss'],
})
export class CalendarListViewComponent implements OnInit {

  startDate = new Date().getTime()

  constructor() { }



  ngOnInit() {
    this.currentHeader = 0
    this.headers.forEach((header) => header.displayed = false)
    this.eventList.sort((a, b) => {
      return a.event.startDate - b.event.startDate
    }).forEach((event) => {
      event.header.displayed = this.shouldDrawHeaderEvent(event.event)
      event.header.title = this.headers[this.currentHeader].title
    })
  }

  eventList = [
    {
      event: this.createMockPlatformEvent(),
      prediction: 100,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 101,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 102,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 100,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 101,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 102,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 100,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 101,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 102,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 100,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 101,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 102,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 100,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 101,
      header: {
        displayed: false,
        title: "Today"
      }
    },
    {
      event: this.createMockPlatformEvent(),
      prediction: 102,
      header: {
        displayed: false,
        title: "Today"
      }
    }
  ]

  private createMockPlatformEvent(): PlatformIndependentEvent {
    var event = new PlatformIndependentEvent()
    event.title = "This is a very cool event"
    this.startDate += 20000000  
    event.startDate = this.startDate
    event.endDate = (this.startDate + 8000000)
    return event
  }

  private currentHeader = 0;
  private headers = [
    {
      title: "Today",
      displayed: false,
      endDate: this.getTodayEnd()
    },
    {
      title: "Tommorow",
      displayed: false,
      endDate: this.getTommorowEnd()
    },
    {
      title: "In the future",
      displayed: false,
      endDate: this.getInfiniteEnd()
    }
  ]
  private shouldDrawHeaderEvent(event: PlatformIndependentEvent) {
    if(this.currentHeader >= this.headers.length - 1) {
      return false
    }
    var selectedHeader = this.headers[this.currentHeader]
    if(event.startDate <= selectedHeader.endDate) {
      if(selectedHeader.displayed) {
        
        return false
      } else {
        
        selectedHeader.displayed = true
        return true
      }
    } else {
      while(event.startDate > selectedHeader.endDate && this.currentHeader < this.headers.length - 1) {
        this.currentHeader++
        selectedHeader = this.headers[this.currentHeader]
      }
      selectedHeader.displayed = true
      return true
    }

    return false
  }

  getTodayEnd() {
    return new Date().setHours(23,59,59,999);
  }

  getTommorowEnd() {
    var newEnd = this.getTodayEnd()
    return new Date(newEnd + 100000).setHours(23,59,59,999)
  }

  getInfiniteEnd() {
    return 8640000000000000
  }
}
