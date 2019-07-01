import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { InterfaceEventInfo } from 'src/app/model/interface-event-info';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Router } from '@angular/router';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
})
export class MonthViewComponent implements OnInit {

  activeDayIsOpen: boolean
  currentMonth: string
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
    console.log("[MONTH] Received the following events")
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
    this.currentMonth = this.constructCurrentMonthString()
    let ev: CalendarEvent<InterfaceEventInfo>
  }

  ngOnInit() { }

  backOneMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth  () - 1))
    this.currentMonth = this.constructCurrentMonthString()
  }

  forwardOneMonth() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1))
    this.currentMonth = this.constructCurrentMonthString()
  }

  constructCurrentMonthString(): string {
    return this.monthsOfYear[this.viewDate.getMonth()] + " " + this.viewDate.getFullYear()
  }

  createMonthViewEvent(interfEvent: InterfaceEventInfo): CalendarEvent<InterfaceEventInfo> {
    let newEvent: CalendarEvent<InterfaceEventInfo> = {
      meta: interfEvent,
      start: new Date(interfEvent.deviceEvent.startDate),
      end: new Date(interfEvent.deviceEvent.endDate),
      id: interfEvent.deviceEvent.event_id,
      title: interfEvent.deviceEvent.title,
      draggable: false
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

  handleEvent(action: string, event: CalendarEvent): void {
    console.log("[MONTH VIEW] Clicked the following event: ")
    console.log({
      event,
      action
    })

    this.router.navigateByUrl("/event-view/" + event.meta.deviceEvent.event_id)
  }

  getShortDayNameFromDate(date: Date) {
    let dayName = this.daysOfWeek[date.getDay()]
    return dayName.substr(0, 2)
  }

  navigateToEvent(event_id: string) {
    this.router.navigateByUrl("/event-view/" + event_id)
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
