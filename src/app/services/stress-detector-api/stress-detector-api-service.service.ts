import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from 'src/app/model/user';
import { CalendarEvent } from 'src/app/model/event';
import { Calendar } from 'src/app/model/calendar';

import { AuthService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class StressDetectorApiService {
  
  private apiBase = "https://stress-detector-diploma.herokuapp.com/detector";
  private usersPath = "/users";
  private calendarPath = "/calendars";
  private eventPath = "/events";

  constructor(private http: HttpClient, private auth: AuthService) {
  }


  // USER-------------------------------
  getUserList(): Promise<User[]> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath
      this.callApi(this.getUserListInternal, address, null, resolve, reject)
    });
  }
  addUser(user: User): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath
      this.callApi(this.addUserInternal, address, user, resolve, reject)
    });
  }
  modifyUser(user_id: string, user: User): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id
      this.callApi(this.modifyUserInternal, address, user, resolve, reject)
    });
  }
  deleteUser(user_id: string): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id
      this.callApi(this.deleteUserInternal, address, null, resolve, reject)
    });
  }
  getUser(user_id: string): Promise<User> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id
      this.callApi(this.getUserInternal, address, null, resolve, reject)
    });
  }

  // CALENDAR-------------------------------
  getCalendarList(user_id: string): Promise<Calendar[]> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath
      this.callApi(this.getCalendarListInternal, address, null, resolve, reject)
    });
  }
  addCalendar(user_id: string, calendar: Calendar): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath
      this.callApi(this.addCalendarInternal, address, calendar, resolve, reject)
    });
  }
  modifyCalendar(user_id: string, calendar_id: number, calendar: Calendar): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id
      this.callApi(this.modifyCalendarInternal, address, calendar, resolve, reject)
    });
  }
  deleteCalendar(user_id: string, calendar_id: number): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id
      this.callApi(this.deleteCalendarInternal, address, null, resolve, reject)
    });
  }
  getCalendar(user_id: string, calendar_id: number): Promise<Calendar> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id
      this.callApi(this.getCalendarInternal, address, null, resolve, reject)
    });
  }

  // EVENT-------------------------------
  getEventList(user_id: string, calendar_id: number): Promise<CalendarEvent[]> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath
      this.callApi(this.getEventListInternal, address, null, resolve, reject)
    });
  }
  addEvent(user_id: string, calendar_id: number, event: CalendarEvent): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath
      this.callApi(this.addEventInternal, address, event, resolve, reject)
    });
  }
  modifyEvent(user_id: string, calendar_id: number, event_id: number, event: CalendarEvent): Promise<string> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + event_id
      this.callApi(this.modifyEventInternal, address, event, resolve, reject)
    });
  }
  deleteEvent(user_id: string, calendar_id: number, event_id: number): Promise<string> {
    return new Promise((resolve,reject)=> { 
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + event_id
      this.callApi(this.deleteEventInternal, address, null, resolve, reject)
    });
  }
  getEvent(user_id: string, calendar_id: number, event_id: number): Promise<CalendarEvent> {
    return new Promise((resolve,reject)=> { 
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + event_id
      this.callApi(this.getEventInternal, address, null, resolve, reject)
    });
  }
  getEventListInInterval(user_id: string, calendar_id: number, start_time: Date, end_time: Date): Promise<CalendarEvent[]> {
    return new Promise((resolve,reject)=> {
      var address = this.apiBase + this.usersPath + "/" + user_id + this.calendarPath + "/" + calendar_id + this.eventPath + "/" + start_time.getTime() + "/" + end_time.getTime()
      this.callApi(this.getEventInternal, address, null, resolve, reject)
    });
  }

  // DETECTION API
  

  private callApi(internalFunc, address, value, resolve, reject) {
    this.authWrapper(internalFunc, address, value).then(
      value => {
        console.log("[API SERVICE] Returned with value: ")
        console.log(value)
        resolve(value as Calendar[])
      },
      error => {
        console.log("[API SERVICE] Returned with error: ")
        console.log(error)
        reject(error)
      }
    )
  }

  private authWrapper(internalFunc, address, value) {
    return new Promise((resolve, reject) => {
      this.auth.getAuthToken().then(
        token => {
          let bearerToken = 'Bearer ' + token
          console.log("[API SERVICE] The bearer token is: " + bearerToken)
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': bearerToken
          });
          internalFunc(this.http, address, headers, value).subscribe(
            (value) => resolve(value),
            (error) => reject(error),
            () => console.log("[API SERVICE]: Finnished call: " + address)
          )
        },
        error => {
          console.log("[API SERVICE] Error getting auth token" + error)
        }
      )
    });
  }


  // USER-------------------------------
  private getUserListInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }
  private addUserInternal(httpClientReference, address, headers, value) {
    return httpClientReference.post(address, value, {headers})
  }
  private modifyUserInternal(httpClientReference, address, headers, value) {
    return this.http.put(address, value, {headers})
  }
  private deleteUserInternal(httpClientReference, address, headers, value) {
    return this.http.delete(address, headers)
  }
  private getUserInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }

  // CALENDAR-------------------------------
  private getCalendarListInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }
  private addCalendarInternal(httpClientReference, address, headers, value) {
    return this.http.post(address, value, {headers})
  }
  private modifyCalendarInternal(httpClientReference, address, headers, value) {
    return this.http.put(address, value, {headers})
  }
  private deleteCalendarInternal(httpClientReference, address, headers, value) {
    return this.http.delete(address, headers)
  }
  private getCalendarInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }

  // EVENT-------------------------------
  private getEventListInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }
  private addEventInternal(httpClientReference, address, headers, value) {
    return this.http.post(address, value, {headers})
  }
  private modifyEventInternal(httpClientReference, address, headers, value) {
    return this.http.put(address, value, {headers})
  }
  private deleteEventInternal(httpClientReference, address, headers, value) {
    return this.http.delete(address, headers)
  }
  private getEventInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }
  private getEventListInIntervalInternal(httpClientReference, address, headers, value) {
    return this.http.get(address, {headers})
  }
}
