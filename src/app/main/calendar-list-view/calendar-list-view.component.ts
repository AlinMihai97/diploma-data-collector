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
        prediction: event.prediction.hasPrediction ? event.prediction.value : "NoPre",
        header: {
          displayed: false,
          title: "Some day"
        }
      })
      this.initHeaders()
    })
    console.log(this.eventList)
  }


  ngOnInit() {

  }
  initHeaders() {
    this.headers = []
    this.eventList.sort((a, b) => {
      return a.event.startDate - b.event.startDate
    }).forEach((event) => {
      let processedDate = this.processDateForEvent(event.event)
      event.header.title = processedDate

      let searchedDate = this.headers.find(header => {
        return header == processedDate
      })

      if(searchedDate === undefined) {
        event.header.displayed = true
        this.headers.push(processedDate)
      } else {
        event.header.displayed = false
      }
    })
  }

  eventList = []

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
