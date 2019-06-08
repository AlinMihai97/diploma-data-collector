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
  ngOnInit() { }
  constructor(private router: Router, private userDataService: StorageService) {
    this.setupData = {}

    this.setupData.selectedCalendarName = ""
    this.setupData.calendarEmail = ""
    this.setupData.timeInPast = ""
    this.setupData.selectedCalendarId = ""
  }

  checkSetup() {
    if (this.setupData.selectedCalendarName === "" || this.setupData.selectedCalendarName === undefined) {
      console.log("Wrong value for calendar name");
      console.log(this.setupData.selectedCalendarName);
      return;
    }

    // improve the check
    if (!this.setupData.calendarEmail.includes("@")) {
      console.log("Invalid email");
      console.log(this.setupData.calendarEmail);
      return;
    }

    console.log("The selected calendar name is " + this.setupData.selectedCalendarName + " with email: " + this.setupData.calendarEmail + " going " + this.setupData.timeInPast + " weeks back");


    this.userDataService.setSelectedCalendarName(this.setupData.selectedCalendarName).then(
      set => {
        if (set) {
          this.userDataService.setCalendarEmail(this.setupData.calendarEmail).then(
            set => {
              if (set) {
                this.userDataService.setTimeInPast(this.setupData.timeInPast).then(
                  set => {
                    if (set) {
                      this.userDataService.setSelectedCalendarId(this.setupData.selectedCalendarId).then(
                        set => {
                          if (set) {
                            this.router.navigate(["/verify-api"])
                          }
                        },
                        error => console.log(error)
                      )
                    }
                  },
                  error => console.log(error)
                )
              }
            },
            error => console.log(error)
          )
        }
      },
      error => console.log(error)
    )


  }
}
