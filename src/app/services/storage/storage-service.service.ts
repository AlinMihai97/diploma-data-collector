import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  userDataIndex = "dataCollectorAppIndex";
  storage: NativeStorage

  storageKeys = {
    userId: "userId",
    userFitbitToken: "userFitbitToken",

    selectedCalendarName: "selectedCalendarName",
    timeInPast: "timeInPast",
    setupDate: "setupDate",
    calendarEmail: "calendarEmail",
    attendeeEventsAttendeeMappings: "attendeeEventsAttendeeMappings"
  }

  constructor() {
    this.storage = new NativeStorage()
  }

  // EXPOSED METHODS------------------------------------------------------

  // SETTERS
  setUserId(value: any) {
    return this.setKeyWithValue(this.storageKeys.userId, value)
  }
  setUserFitbitToken(value: any) {
    return this.setKeyWithValue(this.storageKeys.userFitbitToken, value)
  }
  setSelectedCalendarName(value: any) {
    return this.setKeyWithValue(this.storageKeys.selectedCalendarName, value)
  }
  setTimeInPast(value: any) {
    return this.setKeyWithValue(this.storageKeys.timeInPast, value)
  }
  setCalendarEmail(value: any) {
    return this.setKeyWithValue(this.storageKeys.calendarEmail, value)
  }
  setAttendeeEventsAttendeeMappings(value: any) {
    return this.setKeyWithValue(this.storageKeys.attendeeEventsAttendeeMappings, value)
  }

  // GETTERS
  getUserId() {
    return this.getValueFromKey(this.storageKeys.userId)
  }
  getUserFitbitToken() {
    return this.getValueFromKey(this.storageKeys.userFitbitToken)
  }
  getSelectedCalendarName() {
    return this.getValueFromKey(this.storageKeys.selectedCalendarName)
  }
  getTimeInPast() {
    return this.getValueFromKey(this.storageKeys.timeInPast)
  }
  getCalendarEmail() {
    return this.getValueFromKey(this.storageKeys.calendarEmail)
  }
  getAttendeeEventsAttendeeMappings() {
    return this.getValueFromKey(this.storageKeys.attendeeEventsAttendeeMappings)
  }

  checkIfUserSetupExists() {
    return new Promise<boolean>((resolve, reject) => {
      this.checkIfUserIndexIsSet().then(
        isSet => {
          if (isSet) {
            this.getAllStoredUserData().then(
              result => {
                let baseKeysArray = [
                  this.storageKeys.userId,
                  this.storageKeys.selectedCalendarName,
                  this.storageKeys.calendarEmail,
                  this.storageKeys.timeInPast
                ]

                baseKeysArray.forEach((key) => {
                  if (result[key] === undefined || result[key] === "") {
                    resolve(false)
                    return
                  }
                })
                resolve(true)
              }
            )
          } else {
            resolve(false)
          }
        },
        error => console.log("[STORAGE SERVICE] Error accesing storage")
      )
    });
  }

  clearUserData() {
    return new Promise((resolve, reject) => {
      this.storage.remove(this.userDataIndex).then(
        succes => resolve(true),
        error => reject(error)
      );
    });
  }

  //INTERNAL METHODS----------------------------------------

  private checkIfUserIndexIsSet() {
    return new Promise<boolean>((resolve, reject) => {
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

  private setKeyWithValue(key: string, value: any) {
    return new Promise<boolean>((resolve, reject) => {
      this.checkIfUserIndexIsSet().then(
        isSet => {
          if (!isSet) {
            let newStoreObject = {}
            newStoreObject[this.storageKeys.setupDate] = new Date().getTime()
            newStoreObject[key] = value
            console.log("Setting new stored item with values: ")
            console.log(newStoreObject)
            this.storage.setItem(this.userDataIndex, newStoreObject).then(
              () => {
                resolve(true)
              },
              error => {
                reject(error)
              }
            )
          } else {
            this.storage.getItem(this.userDataIndex).then(
              (storedObject) => {
                storedObject[key] = value
                this.storage.setItem(this.userDataIndex, storedObject).then(
                  () => {
                    resolve(true)
                  },
                  error => reject(error)
                )
              },
              error => reject(error)
            )
          }
        },
        error => reject(error)
      )
    })
  }

  private getValueFromKey(key: string) {
    return new Promise<any>((resolve, reject) => {
      this.checkIfUserIndexIsSet().then(
        (isSet) => {
          if (isSet) {
            this.getAllStoredUserData().then(
              (storedData) => resolve(storedData[key]),
              (error) => reject(error)
            )
          }
          else {
            resolve(undefined)
          }
        },
        error => reject(error)
      )
    })
  }

  getAllStoredUserData() {
    return new Promise((resolve, reject) => {
      this.checkIfUserIndexIsSet().then(
        isSet => {
          if (isSet) {
            this.storage.getItem(this.userDataIndex).then(
              data => resolve(data),
              error => reject(error)
            )
          } else {
            resolve(undefined)
          }
        },
        error => reject(error)
      )

    });
  }

  
}
