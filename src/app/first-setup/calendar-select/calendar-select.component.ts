import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss'],
})
export class CalendarSelectComponent implements OnInit {

  calendars = ["mamaie", "tataie"];

  selectedIndex = 0;
  selectedCalednarName = "";

  constructor(private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      })
    })
  }
  ngOnInit() { }
}
