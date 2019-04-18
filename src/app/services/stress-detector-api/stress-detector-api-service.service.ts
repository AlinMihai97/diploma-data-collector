import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class StressDetectorApiService {
  userToken = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjhUUUQiLCJzdWIiOiI2TFJUSFoiLCJ4YWkiOiI0ODczOTkwMTMzNjIiLCJ4dmVyIjoiMCIsImlzcyI6IkZpdGJpdCIsInR5cCI6ImFjY2Vzc190b2tlbiIsInNjb3BlcyI6IndociB3cHJvIHdudXQgd3NsZSB3d2VpIHdtZmEgd3NvYyB3YWN0IHdzZXQgd2xvYyIsImV4cCI6MTU1NTU0ODQ2NCwiaWF0IjoxNTU1NTE5NjY0fQ.cOwwr8wRJ6JqZWqSLl2eR1FLgpBH5gzQz9cE4ujongE";
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
      'Access-Control-Allow-Origin' : 'https://stress-detector-diploma.herokuapp.com/', 
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
