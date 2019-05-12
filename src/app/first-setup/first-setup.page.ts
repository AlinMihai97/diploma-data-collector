import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage-service.service';

@Component({
  selector: 'app-first-setup',
  templateUrl: './first-setup.page.html',
  styleUrls: ['./first-setup.page.scss'],
})
export class FirstSetupPage implements OnInit {
  setupData = null;
  ngOnInit() {}
  constructor(private router: Router, private userDataService: StorageService) {
    this.setupData = userDataService.getUserDataEmptyModelObject();
  }

  checkSetup() {
    if(this.setupData.selectedCalendarName === "" || this.setupData.selectedCalendarName === undefined) {
      console.log("Wrong value for calendar name");
      console.log(this.setupData.selectedCalendarName);
      return;
    }

    // improve the check
    if(!this.setupData.calendarEmail.includes("@")) {
      console.log("Invalid email");
      console.log(this.setupData.calendarEmail);
      return;
    }
    
    console.log("The selected calendar name is " + this.setupData.selectedCalendarName + " with email: " + this.setupData.calendarEmail + " going " + this.setupData.timeInPast + " weeks back");


    this.userDataService.saveUserData(this.setupData).then(
      succes => {
        this.router.navigate(["main"]);
      },
      error => {
        console.log(error);
      }
    );

    
  }
}
