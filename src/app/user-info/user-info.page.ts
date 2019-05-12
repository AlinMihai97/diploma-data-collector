import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from '../services/storage/storage-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  name = "Vadim Tudor"
  info = "Presedintele Romaniei"
  keys = [] 

  userInfo = {
    // Personal info
    userID: {
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
      fieldName: "Last sync date",
      value: ""
    },
    calendarEmail: {
      fieldName: "Calendar email",
      value: ""
    }
  }

  constructor(private plt: Platform, private storage: StorageService) {
    this.keys = Object.keys(this.userInfo)

    if(!this.plt.is("mobile")) {
      this.keys.forEach((key) => {
        this.userInfo[key].value = "Not available on browser"
      });
    } else {
      this.storage.getUserData().then(
        (info) => {
          this.keys.forEach((key) => {
            this.userInfo[key].value = info[key]
          });
        },
        (error) => {
          this.keys.forEach((key) => {
            this.userInfo[key].value = "Error when getting data from storage"
          });
        }
      )
    }
  }

  ngOnInit() {
  }

  
}
