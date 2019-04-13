import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { StressDetectorApiService } from '../services/stress-detector-api/stress-detector-api-service.service';
import { StorageService } from '../services/storage/storage-service.service';
import { CalendarService } from '../services/calendar/calendar-service.service';
import { EventsService } from '../services/events/events-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data;
  ngOnInit(): void {
    /*this.initFlow();*/
  }
  calendars = [];
  constructor(private events: EventsService, private plt: Platform, private router: Router, private api: StressDetectorApiService, private storage: StorageService, private cal: CalendarService) {
  }

  testStorage() {
    this.storage.checkIfUserDataIsAvailable().then(
      result => {
        console.log("Does any data exist? Ans: " + result)
      },
      error => console.log(error)
    )
  }

  testCalendar() {
    this.cal.getAllCalendarNames().then(
      result => {
        console.log(result)
        this.cal.getEventsFromCalendar("not implemented", "alinmihai97@gmail.com").then(
          result => {
            console.log(result);
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  };

  testEvents() {
    this.storage.getUserData().then(
      result => {
        console.log(result);
        this.cal.getEventsFromCalendar("not implemented", "alinmihai97@gmail.com").then(
          result => {
            console.log(result);
            this.events.proccessEventsForApi(result).then(
              result => {
                console.log(result)
              },
              error => console.log(error)
            )
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }


  /*initFlow() {
    this.plt.ready().then(() => {
      console.log("INIT CALLED");
      this.userDataService.checkIfUserDataIsAvailable().then(
        returnedValue => {
          console.log(returnedValue)
          if (returnedValue === false) {
            this.router.navigate(['first-setup']);
          } else {
            this.userDataService.getUserData().then(
              result => {
                this.data = result;
              }
            )
          }
        }
      )
    });
  }

  restartApp() {
    console.log("home 1");
    this.userDataService.clearUserData().then(
      ceva => {
        console.log("data cleared");
        this.initFlow();
      }
    );
  }*/
}
