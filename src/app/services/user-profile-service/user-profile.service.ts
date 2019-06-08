import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';
import { StorageService } from '../storage/storage-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {


  userProfileInfo: {
    avatarUrl: string,
    userFullName: string
  }

  constructor(private http: HttpClient, private auth: AuthService, private storage: StorageService) {
    this.userProfileInfo = {
      avatarUrl: "",
      userFullName: ""
    }
  }

  getUserAvatarUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      if(this.userProfileInfo.avatarUrl == "") {
        this.getUserProfile().then(
          profileInfo => {
            this.userProfileInfo.avatarUrl = profileInfo.user.avatar150
            resolve(profileInfo.user.avatar150)
          },
          error => reject(error)
        )
      } else {
        resolve(this.userProfileInfo.avatarUrl)
      }
      
    })
  }

  getUserDisplayName(): Promise<string> {
    return new Promise((resolve, reject) => {
      if(this.userProfileInfo.userFullName == "") {
        this.getUserProfile().then(
          profileInfo => {
            this.userProfileInfo.userFullName = profileInfo.user.displayName
            resolve(profileInfo.user.displayName)
          },
          error => reject(error)
        )
      } else {
        resolve(this.userProfileInfo.userFullName)
      }
      
    })
  }

  private getUserProfile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storage.getUserId().then(
        userId => {
          this.auth.getAuthToken().then(
            token => {
              let bearerToken: string = 'Bearer ' + token
              
              this.http.get(this.getProfileUrl(userId), { headers: new HttpHeaders().set('Authorization', bearerToken ) }).subscribe(
                result => resolve(result),
                error => reject(error),
                () => console.log("Finnished profile retrival")
              )
            },
            error => reject(error)
          )

        },
        error => reject(error)
      )
    })
  }

  private getProfileUrl(userId: string): string {
    return "https://api.fitbit.com/1/user/" + userId + "/profile.json"
  }
}
