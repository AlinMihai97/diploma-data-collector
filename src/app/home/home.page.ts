import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { UserDataService } from '../storageServices/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data;
  ngOnInit(): void {
    this.initFlow();
  }
  calendars = [];
  constructor(private plt: Platform, private router: Router, private userDataService: UserDataService) {
  }


  initFlow() {
    this.plt.ready().then(() => {
      console.log("INIT CALLED");
      this.userDataService.checkIfUserDataIsAvailable().then(
        returnedValue => {
          console.log(returnedValue)
          if (returnedValue === false) {
            this.router.navigate(['first-setup']);
          } else {
            this.userDataService.getUserData().then(
              result => {
                this.data = result;
              }
            )
          }
        }
      )
    });
  }

  restartApp() {
    console.log("home 1");
    this.userDataService.clearUserData().then(
      ceva => {
        console.log("data cleared");
        this.initFlow();
      }
    );
  }
}
