import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { StorageService } from '../services/storage/storage-service.service';
import { Router } from '@angular/router';
import { StressDetectorApiService } from '../services/stress-detector-api/stress-detector-api-service.service';
import { User } from '../model/user';
import { reject } from 'q';
import { Calendar } from '../model/calendar';

@Component({
  selector: 'app-verify-api',
  templateUrl: './verify-api.page.html',
  styleUrls: ['./verify-api.page.scss'],
})
export class VerifyApiPage implements OnInit {

  actionMessage = ""
  actionMessageIndex = 0
  actionMessageList = [
    "Checking Fitbit token status",
    "Retriving new Fitbit token and user",
    "Checking user status",
    "Retriving new Fitbit token and user",
    "Checking StressDetector user API Setup",
    "Adding user on API",
    "Checking StressDetector calendar API Setup",
    "Adding calendar on API"
  ]

  constructor(private auth: AuthService, private storage: StorageService, private router: Router, private api: StressDetectorApiService) {
    this.setActionMessage(0)
    this.checkTokenStatus().then(
      succes => {
        if (succes) {
          this.checkUserIdStatus().then(
            succes => {
              if (succes) {
                this.checkUserApiStatus().then(
                  succes => {
                    if (succes) {
                      
                      this.checkCalendarStatus().then(
                        succes => {
                          if(succes) {
                            this.router.navigate(["main"])
                          }
                        },
                        error => reject(error)
                      )
                    }
                  },
                  error => reject(error)
                )
              }
            },
            error => reject(error)
          )
        }
      },
      error => reject(error)
    )
  }

  ngOnInit() {
  }
  private checkTokenStatus() {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.getUserFitbitToken().then(
        token => {
          if (token === undefined || token === "") {
            this.setActionMessage(1)
            this.auth.getAuthToken().then(
              new_token => {
                resolve(true)
              },
              error => reject(error)
            )
          } else {
            resolve(true)
          }
        },
        error => reject(error)
      )
    })
  }

  private checkUserIdStatus() {
    this.setActionMessage(2)
    return new Promise<boolean>((resolve, reject) => {
      this.storage.getUserId().then(
        user_id => {
          if (user_id === undefined || user_id === "") {
            this.setActionMessage(3)
            this.auth.getAuthToken().then(
              new_token => {
                resolve(true)
              },
              error => reject(error)
            )
          } else {
            resolve(true)
          }
        },
        error => reject(error)
      )
    })
  }
  private checkUserApiStatus() {
    this.setActionMessage(4)
    return new Promise<boolean>((resolve, reject) => {
      console.log("Getting user id to compare it to api version")
      this.storage.getUserId().then(
        storedUserId => {
          console.log("got user id")
          this.api.getUser(storedUserId).then(
            user => {
              console.log("getting user data from api")
              if (user !== null && user !== undefined && storedUserId === user.user_id) {
                console.log("User found on server")
                resolve(true)
              } else {
                console.log("User not found on server, adding it noew")
                this.setActionMessage(5)
                let new_user = new User()
                new_user.user_id = storedUserId
                this.api.addUser(new_user).then(
                  operationResult => {
                    if (operationResult) {
                      console.log("User " + storedUserId + " added succesfully on server")
                      resolve(true)
                    } else {
                      reject("Something went wrong when adding user to server")
                    }
                  }
                )
              }
            },
            error => {
              console.log("Error getting user from server", error)
              reject(error)
            }
          )
        },
        error => {
          console.log("Error getting user_id from storage", error)
          reject(error)
        }
      )
    })
  }

  private checkCalendarStatus() {
    this.setActionMessage(6)
    return new Promise<boolean>((resolve, reject) => {
      console.log("Getting user id to retrive calendar")
      this.storage.getUserId().then(
        storedUserId => {
          console.log("Got user id, getting calendar id from storage")
          this.storage.getSelectedCalendarId().then(
            storedCalendarId => {
              console.log("getting calendar data from api")
              this.api.getCalendar(storedUserId, storedCalendarId).then(
                calendar => {
                  if (calendar !== null && calendar !== undefined && calendar.calendar_id === storedCalendarId) {
                    console.log("Calendar found on server")
                    resolve(true)
                  } else {
                    console.log("Calendar not found on server, adding it noew")
                    this.setActionMessage(7)
                    let new_calendar = new Calendar()
                    new_calendar.calendar_id = storedCalendarId
                    console.log("Getting calendar name and email from storage")
                    this.storage.getCalendarEmail().then(
                      calendarEmail => this.storage.getSelectedCalendarName().then(
                        calendarName => {
                          new_calendar.email = calendarEmail
                          new_calendar.name = calendarName
                          this.api.addCalendar(storedUserId, new_calendar).then(
                            operationResult => {
                              if (operationResult) {
                                console.log("Calendar " + calendarName + " added succesfully on server")
                                resolve(true)
                              } else {
                                reject("Something went wrong when adding user to server")
                              }
                            }
                          )
                        },
                        error => reject(error)
                      ),
                      error => reject(error)
                    )
                  }
                },
                error => {
                  console.log("Error getting user from server", error)
                  reject(error)
                }
              )
            },
            error => reject(error)
          )
        },
        error => {
          console.log("Error getting user_id from storage", error)
          reject(error)
        }
      )
    })
  }

  private setActionMessage(index) {
    this.actionMessage = this.actionMessageList[index] + "..."
  }
}
