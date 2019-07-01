import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage-service.service';
import { UserProfileService } from '../services/user-profile-service/user-profile.service';
import { Router } from '@angular/router';
import { StressDetectorApiService } from '../services/stress-detector-api/stress-detector-api-service.service';
import { appInitialize } from '@ionic/angular/dist/app-initialize';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  name = "Vadim Tudor"
  keys = []
  avatarUrl = "https://mediastiriv1.freenode.ro/image/201509/w295h180/media-144264794796847100.jpg"


  userInfo = {
    // Personal info
    userId: {
      fieldName: "Fitbit user ID",
      value: ""
    },
    userFitbitToken: {
      fieldName: "Fitbit token",
      value: ""
    },
    selectedCalendarName: {
      fieldName: "Selected calendar",
      value: ""
    },
    setupDate: {
      fieldName: "App setup date",
      value: ""
    },
    calendarEmail: {
      fieldName: "Calendar email",
      value: ""
    }
  }

  constructor(private api: StressDetectorApiService, private router: Router, private plt: Platform, private storage: StorageService, private userProfile: UserProfileService) {
    this.keys = Object.keys(this.userInfo)

    if (!this.plt.is("mobile")) {
      this.keys.forEach((key) => {
        this.userInfo[key].value = "Not available on browser"
      });
    } else {
      this.storage.getAllStoredUserData().then(
        (info) => {
          console.log("User page got the following data: ", info)
          if (info === undefined) {
            this.setError()
          } else {
            this.keys.forEach((key) => {
              if (key == "setupDate") {
                this.userInfo[key].value = new Date(info[key]).toString()
              } else {
                this.userInfo[key].value = info[key]
              }
            });
          }
        },
        (error) => {
          this.setError()
        }
      )
    }

    this.userProfile.getUserAvatarUrl().then(
      avatarUrl => {
        this.avatarUrl = avatarUrl
      },
      error => console.log(error)
    )

    this.userProfile.getUserDisplayName().then(
      profileName => {
        this.name = profileName
      },
      error => console.log(error)
    )
  }

  setError() {
    this.keys.forEach((key) => {
      this.userInfo[key].value = "Error when getting data from storage"
    });
  }

  ngOnInit() {
  }

  resetApp() {
    this.storage.getUserId().then(
      userId => {
        this.api.deleteUser(userId).then(
          result => {
            if (result) {
              this.storage.clearUserData().then(
                result => {
                  this.router.navigate(["home"])
                },
                error => console.log("Error clearing storage data")
              )
            } else {
              console.log("Error deleting user from API")
            }
          },
          error => console.log("Error deleting user from API")
        )
      },
      error => console.log("Error getting user_id")
    )

  }

}
