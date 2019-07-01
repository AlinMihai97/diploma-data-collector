import { Injectable } from '@angular/core';
import { Calendar, CalendarOptions } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private calendar: Calendar, private plt: Platform) { }


  getAllCalendarNames() {
    // Only returns calendar names in the system
    return new Promise((resolve, reject) => {
      this.calendar.listCalendars().then(

        result => {
          console.log(result)
          resolve(result.map(value => value.name))
        },
        error => reject(error)
      )
    });
  }

  getEventsFromCalendar(startDate: Date, endDate: Date, calendarName, calendarId): Promise<PlatformIndependentEvent[]> {
    let crossPlatformEvents: PlatformIndependentEvent[] = [];
    return new Promise<PlatformIndependentEvent[]>((resolve, reject) => {
      if (this.plt.is('ios') || this.plt.is('android')) {
        let options = this.calendar.getCalendarOptions()
        options.calendarName = calendarName
        options.calendarId = calendarId
        this.calendar.findEventWithOptions("", "", "", startDate, endDate, options).then(
          data => {
            crossPlatformEvents = PlatformIndependentEvent.getEventArayFromData(data, this.plt)

            // process cross platform events in some way in order to get data just in the required timespan
            resolve(crossPlatformEvents);
          },
          error => reject(error)
        )
      }
    });
  }
}
