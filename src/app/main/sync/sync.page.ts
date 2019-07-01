import { Component, OnInit } from '@angular/core';
import { EventManagerService } from 'src/app/services/event-manager/event-manager.service';
import { Router } from '@angular/router';
import { ViewController } from '@ionic/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {

  loadingFinished = false
  syncInfo: any
  displayError = false
  messagesArray: any[]

  constructor(public modalController: ModalController, private eventManager: EventManagerService) {
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.loadingFinished = false
    this.displayError = false
    this.eventManager.sync().then(
      syncInfo => {
        this.syncInfo = syncInfo
        this.updateMessagesList()
        this.loadingFinished = true
      },
      error => {
        this.loadingFinished = false
        this.messagesArray = []
        this.displayError = true
        console.log(error)
      }
    )
  }

  updateMessagesList() {
    this.messagesArray = []
    if (this.syncInfo !== undefined) {
      if (this.syncInfo.originalApIEventsCount != undefined) {
        this.messagesArray.push(
          {
            text: "Events on API before sync",
            value: this.syncInfo.originalApIEventsCount
          }
        )
      }
      if (this.syncInfo.originalDeviceEventsCount != undefined) {
        this.messagesArray.push(
          {
            text: "Processed device events count",
            value: this.syncInfo.originalDeviceEventsCount
          }
        )
      }
      if (this.syncInfo.uploadCount != undefined) {
        this.messagesArray.push(
          {
            text: "New events uploaded on API count",
            value: this.syncInfo.uploadCount
          }
        )
      }
      if (this.syncInfo.updateCount != undefined) {
        this.messagesArray.push(
          {
            text: "Old events updated on api count",
            value: this.syncInfo.updateCount
          }
        )
      }
      if (this.syncInfo.reomvedCount != undefined) {
        this.messagesArray.push(
          {
            text: "Events remove from API count",
            value: this.syncInfo.reomvedCount
          }
        )
      }
      if (this.syncInfo.syncEndDate !== undefined && this.syncInfo.syncStartDate !== undefined) {
        this.messagesArray.push(
          {
            text: "Sync time",
            value: (this.syncInfo.syncEndDate - this.syncInfo.syncStartDate) / 1000 + " seconds"
          }
        )
      }
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
