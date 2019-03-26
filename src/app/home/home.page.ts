import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { NavController, Platform } from '@ionic/angular'
import { Router } from '@angular/router'
import { UserDataService } from '../storageServices/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(): void {
    /*if (this.firstSetup()) {
      
    }*/
    this.userDataService.checkIfUserDataIsAvailable().then(
      returnedValue => {
        if(returnedValue === true) {
          this.router.navigate(['first-setup']);
        } else {
          this.userDataService.getUserData().then(
            result => {
              console.log(result);
            }
          )
        }
      }
    )

  }
  calendars = [];
  constructor(private router: Router, private userDataService: UserDataService) {
  }
  
}
