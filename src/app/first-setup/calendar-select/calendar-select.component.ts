import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-calendar-select',
  templateUrl: './calendar-select.component.html',
  styleUrls: ['./calendar-select.component.scss'],
})
export class CalendarSelectComponent implements OnInit {

  public form = [];
  calendars = [];

  selectedIndex = 0;
  selectedCalednarName = "";

  constructor(private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
        this.initForm()
      })
    })
  }
  ngOnInit() { }

  initForm() {
    this.calendars.forEach(calendar => {
      this.form.push({
        val: calendar.name,
        isChecked: false
      })
    });

    if (this.form.length > 0) {
      this.form[0].isChecked = true;
      this.selectedIndex = 0;
      this.selectedCalednarName = this.form[this.selectedIndex];
    }
  }
  
  updateCheckedStatus() {
    this.form.forEach((element, index) => {
      if (element.isChecked && index != this.selectedIndex) {
        this.form[this.selectedIndex].isChecked = false;
        this.selectedIndex = index;
        this.selectedCalednarName = this.form[this.selectedIndex];
      }
    });
  }
}
