import { Component, OnInit, Input } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';
import { InterfaceEventInfo } from 'src/app/model/interface-event-info';

@Component({
  selector: 'app-calendar-list-view',
  templateUrl: './calendar-list-view.component.html',
  styleUrls: ['./calendar-list-view.component.scss'],
})
export class CalendarListViewComponent implements OnInit {

  startDate = new Date().getTime()

  daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  constructor() { }

  @Input()
  set globalCalendarEventsArray(globalCalendarEventsArray: InterfaceEventInfo[]) {
    console.log("received the following events")
    console.log(globalCalendarEventsArray)
    this.eventList = []
    globalCalendarEventsArray.forEach(event => {
      this.eventList.push({
        event: event.deviceEvent,
        prediction: event.prediction
      })
      this.initList()
    })
    console.log(this.eventList)
  }


  ngOnInit() {

  }
  initList() {
    this.eventsPerDay = []
    this.eventList.sort((a, b) => {
      return a.event.startDate - b.event.startDate
    }).forEach((event) => {
      let deviceEvent = event.event
      let currentEventProcessedDate = this.processDateForEvent(deviceEvent)
      // Search for event in current list
      let foundIndex = -1;

      let searchedDay = this.eventsPerDay.find((dayEvent, index) => {
        if(dayEvent.headerTime == currentEventProcessedDate) {
          foundIndex = index
          return true 
        }
        return false
      })

      if(searchedDay !== undefined) {
        this.eventsPerDay[foundIndex].eventsInDay.push(event)
      } else {
        this.eventsPerDay.push({
          headerTime: currentEventProcessedDate,
          eventsInDay: [event]
        })
      }
    
    })
  }

  eventList = []

  eventsDaysIndex = 0
  eventsPerDay: {
    headerTime: string,
    eventsInDay: any[]
  }[] = []

  private headers: string[] = []

  private processDateForEvent(event: PlatformIndependentEvent): string {
    let startDate = new Date(event.startDate)

    let processedDate = ""
    processedDate = "" + this.daysOfWeek[startDate.getDay()] + ", "
    processedDate += startDate.getDate() + " "
    processedDate += this.monthsOfYear[startDate.getMonth()]

    if (startDate.getFullYear() != new Date().getFullYear()) {
      processedDate += " " + startDate.getFullYear()
    }

    return processedDate
  }

}
