import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class StressDetectorApiService {
  userToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjhUUUQiLCJzdWIiOiI2TFJUSFoiLCJ4YWkiOiI4MTUwMzIwNjYyNTciLCJ4dmVyIjoiMCIsImlzcyI6IkZpdGJpdCIsInR5cCI6ImFjY2Vzc190b2tlbiIsInNjb3BlcyI6IndociB3cHJvIHdudXQgd3NsZSB3d2VpIHdtZmEgd3NvYyB3YWN0IHdzZXQgd2xvYyIsImV4cCI6MTU1NTIwNDAyOCwiaWF0IjoxNTU1MTc1MjI4fQ.nS4Bsd9Zep3DUcTGV1O_yjasZtT0aWPC9c4AihrtlKM";
  userId = "6LRTHZ";

  apiBase = "https://stress-detector-diploma.herokuapp.com/detector";
  usersPath = "/users";
  calendarPath = "/calendar";
  eventPath = "/event";

  constructor(private http: HttpClient) {}

  private errorLogger() {

  }

  getUserList() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userToken,
    });
    this.http.get(this.apiBase + this.usersPath, { headers }).subscribe(
      (value) => console.log(value),
      (error) => console.log(error),
      () => console.log("Finnished")
    )
  }

  addUser() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.userToken,
    });
    this.http.post(this.apiBase + this.usersPath,{
      user_id: this.userId
    } ,{ headers }).subscribe(
      (value) => console.log(value),
      (error) => console.log(error),
      () => console.log("Finnished")
    )
  }

  getUser() {

  }

  modifyUser() {

  }


}
