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

  messagesArray: string[]

  constructor(public modalController: ModalController, private eventManager: EventManagerService) {
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.loadingFinished = false
    this.eventManager.sync().then(
      syncInfo => {
        this.syncInfo = syncInfo
        this.updateMessagesList()
        this.loadingFinished = true
      },
      error => {
        this.loadingFinished = true
        this.messagesArray = []
        this.messagesArray.push("Sync error")
        console.log(error)
      }
    )
  }

  updateMessagesList() {
    this.messagesArray = []
    if(this.syncInfo !== undefined) {
      if(this.syncInfo.originalApIEventsCount != undefined) {
        this.messagesArray.push("Before sync there were " + this.syncInfo.originalApIEventsCount + " events on api")
      }
      if(this.syncInfo.originalDeviceEventsCount != undefined) {
        this.messagesArray.push("On device there are " + this.syncInfo.originalDeviceEventsCount + " events")
      }
      if(this.syncInfo.omittedUploadEventsCount != undefined) {
        this.messagesArray.push("Ommitted " + this.syncInfo.omittedUploadEventsCount + " total recuring events")
      }
      if(this.syncInfo.uploadCount != undefined) {
        this.messagesArray.push("Upload count " + this.syncInfo.uploadCount)
      }
      if(this.syncInfo.updateCount != undefined) {
        this.messagesArray.push("Update count " + this.syncInfo.updateCount)
      }
      if(this.syncInfo.syncEndDate !== undefined && this.syncInfo.syncStartDate !== undefined) {
        this.messagesArray.push("Sync took " + (this.syncInfo.syncEndDate - this.syncInfo.syncStartDate)/1000 + " seconds")
      }
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
