import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { StorageService } from '../services/storage/storage-service.service';
import { Router } from '@angular/router';
import { StressDetectorApiService } from '../services/stress-detector-api/stress-detector-api-service.service';
import { User } from '../model/user';
import { reject } from 'q';

@Component({
  selector: 'app-verify-api',
  templateUrl: './verify-api.page.html',
  styleUrls: ['./verify-api.page.scss'],
})
export class VerifyApiPage implements OnInit {

  constructor(private auth: AuthService, private storage: StorageService, private router: Router, private api: StressDetectorApiService) {
    this.checkTokenStatus().then(
      succes => {
        if (succes) {
          this.checkUserIdStatus().then(
            succes => {
              if(succes) {
                this.checkUserApiStatus().then(
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

  ngOnInit() {
  }
  private checkTokenStatus() {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.getUserFitbitToken().then(
        token => {
          if (token === undefined || token === "") {
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
    return new Promise<boolean>((resolve, reject) => {
      this.storage.getUserId().then(
        user_id => {
          if (user_id === undefined || user_id === "") {
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
    return new Promise<boolean>((resolve, reject) => {
      console.log("Getting user id to compare it to api version")
      this.storage.getUserId().then(
        storedUserId => {
          console.log("got user id")
          this.api.getUser(storedUserId).then(
            
            succes => {
              console.log("getting user data from api")
              if(succes !== null && succes !== undefined) {
                console.log("User found on server")
                resolve(true)
              } else {
                console.log("User not found on server, adding it noew")
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

  }
}
