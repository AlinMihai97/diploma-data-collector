import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
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
        result => resolve(result.map(value => value.name)),
        error => reject(error)
      )
    });
  }

  getEventsFromCalendar(durationInWeeks, calendarName): Promise<PlatformIndependentEvent[]> {
    let crossPlatformEvents: PlatformIndependentEvent[] = [];
    return new Promise<PlatformIndependentEvent[]>((resolve, reject) => {
      if (this.plt.is('ios')) {
        
        this.calendar.findAllEventsInNamedCalendar(calendarName, new Date('2019-01-01T00:00:00'), new Date()).then(data => {
          crossPlatformEvents = PlatformIndependentEvent.getEventArayFromData(data, this.plt)

          // process cross platform events in some way in order to get data just in the required timespan

          resolve(crossPlatformEvents);
        },
          error => reject(error)
        );
      } else if (this.plt.is('android')) {
        reject("Android event retrival not yet implemented");
        //Reimplement all Android logic
        // let start = new Date();
        // let end = new Date();
        // end.setDate(end.getDate() + 31);

        // this.calendar.listEventsInRange(start, end).then(data => {
        //   this.crossPlatformEvents = PlatformIndependentEvent.getEventArayFromData(data, this.plt)
      }
    });
  }
}
