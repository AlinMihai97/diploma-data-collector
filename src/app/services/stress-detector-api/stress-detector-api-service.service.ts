import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/model/user';
import { CalendarEvent } from 'src/app/model/event';
import { Calendar } from 'src/app/model/calendar';

import { AuthService } from '../auth/auth-service.service';
import { HTTP } from '@ionic-native/http/ngx';
import { } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StressDetectorApiService {

  private apiBase = "https://stress-detector-diploma.herokuapp.com/detector";
  private usersPath = "/users";
  private calendarPath = "/calendars";
  private eventPath = "/events";


  // private http: HTTP
  constructor(private http: HttpClient, private auth: AuthService) {
    //this.http = new HTTP()
  }


  // USER-------------------------------
  getUserList(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/"

      let processResult = (data) => {
        let resultArray: User[] =[]
        let userList: any[] = (data.user_list)
        userList.forEach((value) => {
          resultArray.push(value as User)
        })
        return resultArray
      }

      this.callApi(this.getUserListInternal, address, null, resolve, reject, processResult)
    });
  }
  addUser(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/"
      this.authWrapper(this.addUserInternal, address, user).then(
        result => {
          if(result !== "") {
             resolve(true)
          }
          resolve(false)
        },
        error => {
          if(error.message === "The user id already exists in the database.") {
            console.log("User already on server")
            resolve(true)
          } else {
            reject(error)
          }
        }
      )
    });
  }
  modifyUser(user_id: string, user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + "/"
      let processResult = (data) => {}
      this.callApi(this.modifyUserInternal, address, user, resolve, reject, processResult)
    });
  }
  deleteUser(user_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id
      let processResult = (data) => {
        if(data !== "") {
          return true
        }
        return false
      }
      this.callApi(this.deleteUserInternal, address, null, resolve, reject, processResult)
    });
  }
  getUser(user_id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id
      this.authWrapper(this.getUserInternal, address, null).then(
        result => {
          resolve(result as User)
        },
        error => {
          if(error.message === "The user was not found in the database.") {
            console.log("User not found on server")
            resolve(null)
          } else {
            reject(error)
          }
        }
      )
    });
  }

  // // CALENDAR-------------------------------
  getCalendarList(user_id: string): Promise<Calendar[]> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/"
      let processResult = (data) => {}
      this.callApi(this.getCalendarListInternal, address, null, resolve, reject, processResult)
    });
  }
  addCalendar(user_id: string, calendar: Calendar): Promise<string> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/"
      let processResult = (data) => {}
      this.callApi(this.addCalendarInternal, address, calendar, resolve, reject, processResult)
    });
  }
  modifyCalendar(user_id: string, calendar_id: number, calendar: Calendar): Promise<string> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + "/"
      let processResult = (data) => {}
      this.callApi(this.modifyCalendarInternal, address, calendar, resolve, reject, processResult)
    });
  }
  deleteCalendar(user_id: string, calendar_id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + "/"
      let processResult = (data) => {}
      this.callApi(this.deleteCalendarInternal, address, null, resolve, reject, processResult)
    });
  }
  getCalendar(user_id: string, calendar_id: number): Promise<Calendar> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + "/"
      let processResult = (data) => {}
      this.callApi(this.getCalendarInternal, address, null, resolve, reject, processResult)
    });
  }

  // EVENT-------------------------------
  getEventList(user_id: string, calendar_id: number): Promise<CalendarEvent[]> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/"
      let processResult = (data) => {}
      this.callApi(this.getEventListInternal, address, null, resolve, reject, processResult)
    });
  }
  addEvent(user_id: string, calendar_id: number, event: CalendarEvent): Promise<string> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/"
      let processResult = (data) => {}
      this.callApi(this.addEventInternal, address, event, resolve, reject, processResult)
    });
  }
  modifyEvent(user_id: string, calendar_id: number, event_id: number, event: CalendarEvent): Promise<string> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + event_id + "/"
      let processResult = (data) => {}
      this.callApi(this.modifyEventInternal, address, event, resolve, reject, processResult)
    });
  }
  deleteEvent(user_id: string, calendar_id: number, event_id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + event_id + "/"
      let processResult = (data) => {}
      this.callApi(this.deleteEventInternal, address, null, resolve, reject, processResult)
    });
  }
  getEvent(user_id: string, calendar_id: number, event_id: number): Promise<CalendarEvent> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + event_id + "/"
      let processResult = (data) => {}
      this.callApi(this.getEventInternal, address, null, resolve, reject, processResult)
    });
  }
  getEventListInInterval(user_id: string, calendar_id: number, start_time: Date, end_time: Date): Promise<CalendarEvent[]> {
    return new Promise((resolve, reject) => {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + start_time.getTime() + "/" + end_time.getTime()
      let processResult = (data) => {}
      this.callApi(this.getEventInternal, address, null, resolve, reject, processResult)
    });
  }

  // DETECTION API


  private callApi(internalFunc: (address: string, headers: HttpHeaders, value: any) => Observable<any>, address, value, resolve, reject, processResult) {
    this.authWrapper(internalFunc, address, value).then(
      value => {
        resolve(processResult(value))
      },
      error => {
        reject(error)
      }
    )
  }

  private authWrapper(internalFunc, address, value) {
    return new Promise((resolve, reject) => {
      this.auth.getAuthToken().then(
        token => {
          let bearerToken: string = 'Bearer ' + token
          let contentType: string = 'application/json'

          console.log("[API SERVICE] The bearer token is: " + bearerToken)

          let headers = new HttpHeaders({
            'Content-Type': contentType,
            'Authorization': bearerToken
          });

          internalFunc(address, headers, value).subscribe(
            (result) => {
              resolve(result)
            },
            (error) => {
              reject(error)
            },
            () => console.log("Finnished request for url: " + address)
          )
        },
        error => {
          console.log("[API SERVICE] Error getting auth token" + error)
        }
      )
    });
  }


  // USER-------------------------------
  private getUserListInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }
  private addUserInternal = (address, headers, value) => {
    return this.http.post(address, value, { headers: headers })
  }
  private modifyUserInternal = (address, headers, value) => {
    return this.http.put(address, value, { headers: headers })
  }
  private deleteUserInternal = (address, headers, value) => {
    return this.http.delete(address, { headers: headers })
  }
  private getUserInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }

  // CALENDAR-------------------------------
  private getCalendarListInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }
  private addCalendarInternal = (address, headers, value) => {
    return this.http.post(address, value, { headers: headers })
  }
  private modifyCalendarInternal = (address, headers, value) => {
    return this.http.put(address, value, { headers: headers })
  }
  private deleteCalendarInternal = (address, headers, value) => {
    return this.http.delete(address, headers)
  }
  private getCalendarInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }

  // EVENT-------------------------------
  private getEventListInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }
  private addEventInternal = (address, headers, value) => {
    return this.http.post(address, value, { headers: headers })
  }
  private modifyEventInternal = (address, headers, value) => {
    return this.http.put(address, value, { headers: headers })
  }
  private deleteEventInternal = (address, headers, value) => {
    return this.http.delete(address, headers)
  }
  private getEventInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }
  private getEventListInIntervalInternal = (address, headers, value) => {
    return this.http.get(address, { headers: headers })
  }
}