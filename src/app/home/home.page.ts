import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { NavController, Platform } from '@ionic/angular'
import {Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(): void {
  }

  calendars = [];

  constructor(private router: Router, public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      })
    })
  }

  addEvent(cal) {
    let date = new Date();
    let options = { calendarId: cal.id, calendarName: cal.name, url: 'https://ionicacademy.com', firstReminderMinutes: 15 };

    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
    }, err => {
      console.log('err: ', err);
    });
  }

  openCal(cal) {

    this.router.navigateByUrl("/cal-details/" + cal.name)
  }
}
