import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { InterfaceEventInfo } from 'src/app/model/interface-event-info';
import { Router } from '@angular/router';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  isSameYear
} from 'date-fns';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss'],
})
export class WeekViewComponent implements OnInit {

  activeDayIsOpen: boolean
  currentWeek: string
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

  daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  _interfaceEvents: InterfaceEventInfo[] = []
  @Input()
  set interfaceEvents(interfaceEvents: InterfaceEventInfo[]) {
    console.log("[WEEK] Received the following events")
    console.log(interfaceEvents)
    this._interfaceEvents = interfaceEvents

    this.events = []
    interfaceEvents.forEach(event => {
      this.events.push(this.createMonthViewEvent(event))
    })
    console.log("Processed the following events for month view: ")
    console.log(this.events)
  }

  viewDate: Date = new Date();
  events: CalendarEvent<InterfaceEventInfo>[] = [];

  constructor(private router: Router) {
    this.currentWeek = this.constructcurrentWeekString()
    let ev: CalendarEvent<InterfaceEventInfo>
  }

  ngOnInit() { }

  backOneWeek() {
    this.viewDate = new Date(this.viewDate.setDate(this.viewDate.getDate() - 7))
    this.currentWeek = this.constructcurrentWeekString()
  }

  forwardOneWeek() {
    this.viewDate = new Date(this.viewDate.setDate(this.viewDate.getDate() + 7))
    this.currentWeek = this.constructcurrentWeekString()
  }

  constructcurrentWeekString(): string {

    var returnString = "Week "
    let weekStartDate = new Date(this.viewDate.setDate(this.viewDate.getDate() - this.viewDate.getDay()))
    let weekEndDate = new Date(this.viewDate.setDate(this.viewDate.getDate() + 6 - this.viewDate.getDay()))

    if (isSameMonth(weekStartDate, weekEndDate)) {
      returnString += weekStartDate.getDate() + " - " + weekEndDate.getDate() + " " + this.monthsOfYear[weekEndDate.getMonth()]
    } else {
      returnString += weekStartDate.getDate() + " " + this.monthsOfYear[weekStartDate.getMonth()] + " - " + weekEndDate.getDate() + " " + this.monthsOfYear[weekEndDate.getMonth()]
    }
    returnString += isSameYear(this.viewDate, new Date()) ? "" : " of " + this.viewDate.getFullYear()
    return returnString
  }

  createMonthViewEvent(interfEvent: InterfaceEventInfo): CalendarEvent<InterfaceEventInfo> {
    let newEvent: CalendarEvent<InterfaceEventInfo> = {
      meta: interfEvent,
      start: new Date(interfEvent.deviceEvent.startDate),
      end: new Date(interfEvent.deviceEvent.endDate),
      id: interfEvent.deviceEvent.event_id,
      title: interfEvent.deviceEvent.title,
      draggable: false,
      color: {
        primary: "#002A3A",
        secondary: "#e0effe"
      }
    }

    return newEvent
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.activeDayIsOpen = false
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  event_id: string = undefined

  handleEvent(action: string, event: CalendarEvent): void {
    console.log("[WEEK VIEW] Clicked the following event: ")
    console.log({
      event,
      action
    })

    let event_id = event.meta.deviceEvent.event_id

    if (this.event_id === event_id) {
      this.router.navigateByUrl("/event-view/" + event_id)
    } else {
      this.event_id = event_id
    }
    // 
  }

  navigateToEvent(event_id: string) {
  }
  getShortDayNameFromDate(date: Date) {
    let dayName = this.daysOfWeek[date.getDay()]
    return dayName.substr(0, 2)
  }

  getShortHourFromDate(date: Date) {
    return "" + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  }

  getHours(event: PlatformIndependentEvent) {
    let startDate = new Date(event.startDate)
    let endDate = new Date(event.endDate)
    return this.apZ(startDate.getHours()) + ":" + this.apZ(startDate.getMinutes()) + " - " + this.apZ(endDate.getHours()) + ":" + this.apZ(endDate.getMinutes())
  }

  private apZ(val: number) {
    // Append zero
    return val < 10 ? "0" + val : val + ""
  }
}
