import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss'],
})
export class CalendarSelectComponent implements OnInit {

  @Input() setupData;

  calendars = ["mamaie", "tataie"];

  selectedIndex = 0;
  selectedCalednar;

  constructor(private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      })
    })
  }
  ngOnInit() { }

  optionChanged() {
    console.log(this.selectedCalednar);
    this.setupData.selectedCalendarName = this.selectedCalednar.name;
    this.setupData.selectedCalendarId = this.selectedCalednar.id;
  }
}
