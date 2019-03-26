import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  userDataIndex = "dataCollectorAppIndex";

  constructor(private nativeStorage: NativeStorage) { }

  async checkIfUserDataIsAvailable() {
    var returnValue;

    await this.nativeStorage.keys().then(
      keysArray => {
        if(keysArray.includes(this.userDataIndex)) {
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

    await this.nativeStorage.getItem(this.userDataIndex).then(
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

    await this.nativeStorage.setItem(this.userDataIndex, obj).then(
      succes => {
        succes = true;
      },
      error => {
        succes = false;
      }
    )

    return true;
  }
}
