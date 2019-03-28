import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userDataIndex = "dataCollectorAppIndex";
  storage = new NativeStorage()

  constructor() { }

  async checkIfUserDataIsAvailable() {
    var returnValue;

    await this.storage.keys().then(
      keysArray => {
        console.log(keysArray)
        if (keysArray.includes(this.userDataIndex)) {
          returnValue = true;
        } else {
          returnValue = false;
        }
      },
      error => {
        console.log(error);
      }
    )

    return returnValue;
  }

  async getUserData() {
    var result;

    await this.storage.getItem(this.userDataIndex).then(
      data => {
        result = data;
      },
      error => {
        console.log(error);
      }
    )

    return result;
  }

  async saveUserData(obj) {
    var succes;

    await this.storage.setItem(this.userDataIndex, obj).then(
      succes => {
        succes = true;
      },
      error => {
        succes = false;
      }
    )

    return succes;
  }

  async clearUserData() {
    console.log("service 1")
    await this.storage.remove(this.userDataIndex).then(
      succes => {
        console.log("succes");
      },
      error => {
        console.log(error)
      }
    );
    return;
  }

}
