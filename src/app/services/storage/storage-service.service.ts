import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  userDataIndex = "dataCollectorAppIndex";
  storage = new NativeStorage()

  constructor() { }

  checkIfUserDataIsAvailable() {
    return new Promise((resolve, reject) => {
      this.storage.keys().then(
        keysArray => {
          console.log(keysArray)
          if (keysArray.includes(this.userDataIndex)) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => reject(error)
      )
    });
  }

   getUserData() {
    return new Promise((resolve, reject) => {
      this.storage.getItem(this.userDataIndex).then(
        data => resolve(data),
        error => reject(error)
      )
    });
  }

  saveUserData(obj) {
    return new Promise((resolve, reject) => {
      this.storage.setItem(this.userDataIndex, obj).then(
        () => resolve(obj),
        error => reject(error)
      )
    })

    

  }

   clearUserData() {
    return new Promise((resolve, reject) => {
      this.storage.remove(this.userDataIndex).then(
        succes => resolve(true),
        error => reject(error)
      );
    });

  }


  getUserDataEmptyModelObject() {
    return {
      userID: "",
      userFitbitToken: "",

      selectedCalendarName: "",
      timeInPast: "",
      setupDate: new Date(),
      calendarEmail: "",
      attendeeEventsAttendeeMappings: {}
    };
  }
}
