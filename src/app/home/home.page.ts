import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { StressDetectorApiService } from '../services/stress-detector-api/stress-detector-api-service.service';
import { StorageService } from '../services/storage/storage-service.service';
import { CalendarService } from '../services/calendar/calendar-service.service';
import { EventsService } from '../services/events/events-service.service';
import { AuthService } from '../services/auth/auth-service.service';
import { User } from '../model/user';
import { ClassifierService } from '../services/classifier/classifier.service';
import { CalendarEvent } from 'angular-calendar';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(): void {
    // this.initFlow();
    this.initFlow()
  }
  calendars = [];
  constructor(private classifier: ClassifierService, private auth: AuthService, private events: EventsService, private plt: Platform, private router: Router, private api: StressDetectorApiService, private storage: StorageService, private cal: CalendarService) {
    var ev: CalendarEvent
  }

  testStorage() {
    this.storage.checkIfUserSetupExists().then(
      result => {
        console.log("Does any data exist? Ans: " + result)
        this.storage.getSelectedCalendarName().then(
          result => console.log(result),
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  testCalendar() {
    let date = new Date()
    this.cal.getEventsFromCalendar(new Date(date.setDate(-60)), new Date(date.setDate(30)), "alinmihai97@gmail.com", 3).then(
      result => {
        console.log(result)
      },
      error => console.log(error)
    )
  };

  testEvents() {
    // this.storage.getUserId().then(
    //   result => {
    //     console.log(result);
    //     this.cal.getEventsFromCalendar("not implemented", "alinmihai97@gmail.com").then(
    //       result => {
    //         console.log(result);
    //         this.events.proccessEventsForApi(result).then(
    //           result => {
    //             console.log(result)
    //           },
    //           error => console.log(error)
    //         )
    //       },
    //       error => console.log(error)
    //     )
    //   },
    //   error => console.log(error)
    // )
  }

  testApi() {
    let user = new User()
    user.user_id = "6LRTHZ"
    this.api.deleteUser(user.user_id).then(
      operationResult => {
        if (operationResult) {
          console.log("user deleted")
          this.api.addUser(user).then(
            operationResult => {
              if (operationResult) {
                console.log("user added")
                this.api.getUserList().then(
                  result => {
                    console.log(result)
                  },
                  error => {
                    console.log(error)
                  }
                )
              }
            },
            error => console.log(error)
          )
        }
      },
      error => console.log(error)
    )
    // this.api.getUserList().then(
    //   result => {
    //     console.log(result)
    //     let demoCal = new Calendar()
    //     demoCal.calendar_id = 123
    //     demoCal.email = "some calendar email"
    //     if (result.length != 0) {
    //       var user_id = result[0].user_id
    //       this.api.addCalendar(user_id, demoCal).then(
    //         result => {
    //           console.log(result)
    //           var demoEvent = new CalendarEvent()
    //           demoEvent.start_time = new Date().getTime()
    //           demoEvent.end_time = new Date().getTime() + 10000
    //           demoEvent.is_organizer = false
    //           demoEvent.location = "some location"
    //           demoEvent.participants = []
    //           demoEvent.event_id = 1000

    //           this.api.addEvent(user_id, 123, demoEvent).then(
    //             result => {
    //               console.log(result)
    //             },
    //             error => {
    //               console.log(error)
    //             }
    //           )
    //         },
    //         error => {
    //           console.log(error)
    //         }
    //       )
    //     }

    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
  }

  testAuth() {

    this.auth.getAuthToken().then(
      (resultToken) => {
        console.log("Home got token, trying to get it again from storage")
        this.auth.getAuthToken().then(
          (resultToken) => {
            console.log("Home got token again")
            this.auth.getAuthToken().then(
              (result) => {
                console.log("Got token for the third time")
              },
              (error) => {
                console.log("error on third call")
              }
            )
          },
          (error) => {
            console.log("error on second auth call")
          }
        )
      },
      (error) => {
        console.log("error on first auth call")
      }
    )
  }

  goAnOtherPage() {
    this.router.navigateByUrl("/main")
  }

  ionViewWillEnter() {
    
  }
  initFlow() {
    this.plt.ready().then(() => {
      console.log("INIT CALLED");
      this.storage.getUserId().then(
        userId => {
          if (userId !== undefined) {
            console.log("[HOME PAGE] User ID found on device")
            // this should be replaced with introspect check
            this.storage.getUserFitbitToken().then(
              token => {
                if (token !== undefined) {
                  console.log("[HOME PAGE] Token found on device")
                  console.log("[HOME PAGE] No auth needed, checking user setup")
                  this.storage.checkIfUserSetupExists().then(
                    returnedValue => {
                      console.log(returnedValue)
                      if (returnedValue === false) {
                        console.log("[LOGIN PAGE] Setup needed")
                        this.router.navigate(['first-setup']);
                      } else {
                        console.log("[LOGIN PAGE] Setup not needed continuing flow")
                        this.router.navigate(["verify-api"], { replaceUrl: true })
                        
                      }
                    },
                    error => console.log("[LOGIN PAGE] Storage error" + error)
                  )
                } else {
                  // Going to login
                  this.router.navigate(["login"])
                }
              },
              error => console.log("[HOME PAGE] Storage error" + error)
            )
          } else {
            // Going to login
            this.router.navigate(["login"])
          }
        },
        error => console.log("[HOME PAGE] Storage error" + error)
      )

    });
  }
  testClassifier() {
    console.log(this.classifier.classify("daily meeting"))
    console.log(this.classifier.classify("daily sprints"))
    console.log(this.classifier.classify("Board review"))
    console.log(this.classifier.classify("Party Friday"))
    console.log(this.classifier.classify("candidate interview"))
    console.log(this.classifier.classify("Monthly review"))
    console.log(this.classifier.classify("budget cuts"))
    console.log(this.classifier.classify("happy friday"))
    console.log(this.classifier.classify("team building"))
    console.log(this.classifier.classify("social gathering"))
    console.log(this.classifier.classify("one on one"))
  }
}
