import { Component, OnInit } from '@angular/core';


import { StorageService } from '../services/storage/storage-service.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.page.html',
  styleUrls: ['./data-upload.page.scss'],
})
export class DataUploadPage implements OnInit {

  workSteps = [
    {
      loadingText: "Checking User",
      succesText: "User found",
      displayClass: "",
      isLoading: true,
      isSucces: false,
      work: function () {
        return new Promise(function (resolve, reject) {

          this.storageService.getUserData(
            (userData) => {
              console.log("Got the following user data: " + userData);
              this.http.post()
            }
          )

          // get user settings from storage
          // get user ID and token from storage
          // verify if token is available or expired
          // if not available or it expired request new token and start new login flow
          // save the data to the storage
          setTimeout(() => {
            resolve(0)
          }, 2000);
        })
      }
    },
    {
      loadingText: "Checking Calendar",
      succesText: "Calendar found",
      displayClass: "",
      isLoading: true,
      isSucces: false,
      work: function () {
        return new Promise(function (resolve, reject) {
          // call storage and get calendar
          // check if calendar is added to the user on the api
          // if not added add it now

          this.storageService.getUserData().then((userData) => {
            console.log("got following user data: " + userData);
            setTimeout(() => {
              resolve(0)
            }, 2000);
          });

        })
      }
    },
    {
      loadingText: "Getting events data",
      succesText: "Events Retrieved",
      displayClass: "",
      isLoading: true,
      isSucces: false,
      work: function () {
        return new Promise(function (resolve, reject) {
          // call calendar service and get events
          // save events objects in the current component
          setTimeout(() => {
            resolve(0)
          }, 2000);
        })
      }
    },
    {
      loadingText: "Creating attendees mappings",
      succesText: "Attendees mappings update",
      displayClass: "",
      isLoading: true,
      isSucces: false,
      work: function () {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(0)
          }, 2000);
        })
      }
    },
    {
      loadingText: "Classifing meeting titles",
      succesText: "Titles classified",
      displayClass: "",
      isLoading: true,
      isSucces: false,
      work: function () {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(0)
          }, 2000);
        })
      }
    },
    {
      loadingText: "Sending events",
      succesText: "Events sent",
      displayClass: "",
      isLoading: true,
      isSucces: false,
      work: function () {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(0)
          }, 2000);
        })
      }
    },
  ]

  hideClassName = "hideStep"
  showClassName = "fadeIn"

  constructor(private storageService: StorageService) {
    this.workSteps.forEach(step => {
      step.displayClass = this.hideClassName;
    });
    this.doProcess(0);
  }

  ngOnInit() {
  }

  doProcess(stepIndex) {
    if (stepIndex < this.workSteps.length) {

      let currentStep = this.workSteps[stepIndex];
      currentStep.displayClass = this.showClassName;

      currentStep.work().then((succes) => {
        console.log(succes);
        currentStep.isLoading = false;
        currentStep.isSucces = true;
        this.doProcess(stepIndex + 1);
      },
        (error) => {
          console.log("We should never have an error");
        });
    }
  }
}
