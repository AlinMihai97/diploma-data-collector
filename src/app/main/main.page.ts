import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router'
import { EventManagerService } from '../services/event-manager/event-manager.service';
import { PlatformIndependentEvent } from '../model/platform-independent-model';
import { SyncPage } from './sync/sync.page';
import { CalendarEvent } from '../model/event';
import { InterfaceEventInfo } from '../model/interface-event-info';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  globalCalendarEventsArray: InterfaceEventInfo[] = []

  predictionOffset = 2000 // Number of millis to wait in addition to prediction ETA
  predictionMaxRetries = 3 // Number of tries to retry getting the prediction

  firstSyncInProgress = false

  ngOnInit() { }

  constructor(private menu: MenuController,
    private router: Router,
    private eventManager: EventManagerService,
    private modalController: ModalController) {

    this.menu.enable(true, 'first');
    this.globalCalendarEventsArray = []

    this.firstSyncInProgress = true
    this.eventManager.sync().then(
      result => {
        this.firstSyncInProgress = false
        this.DEBUG("Synced events on page start with the following result: ", result)
        this.updateGlobalEvents(true, this.predictionMaxRetries)
      },
      error => console.log(error)
    )
  }

  openFirst() {
    this.menu.open('first');
  }

  updateGlobalEvents(refreshData: boolean, maxNumPredictionRetries: number) {
    this.DEBUG("Updating global events for interface", undefined)
    this.eventManager.getGlobalCalendarEventsArray().then(
      globalEvents => {
        if (refreshData) {
          this.DEBUG("Refreshing global events with values: ", globalEvents)
          this.globalCalendarEventsArray = globalEvents
        }
        this.eventManager.getCurrentSetupPrediction().then(
          prediction => {
            this.DEBUG("Got the following prediciton data: ", prediction)
            if (prediction.ETA > 0) {
              if (maxNumPredictionRetries > 0) {
                this.DEBUG("Retring acquiring prediciton try no. " + (this.predictionMaxRetries - maxNumPredictionRetries + 1), undefined)
                setTimeout(() => {
                  this.updateGlobalEvents(false, maxNumPredictionRetries - 1)
                }, this.predictionOffset + prediction.ETA * 1000)
              } else {
                // Here I should generate some mock predictions just for display
                this.globalCalendarEventsArray.forEach(event => {
                  event.prediction.eventWithPrediction = event.deviceEvent.startDate > new Date().getTime()
                  event.prediction.hasPrediction = true
                  event.prediction.value = Math.floor(Math.random() * 100) % 26; 
                })
                // Trigger data refresh
                this.globalCalendarEventsArray = this.globalCalendarEventsArray
              }
            } else {
              this.DEBUG("Got prediction, updating interface events", undefined)
              this.globalCalendarEventsArray = this.eventManager.updateEventDataWithPrediciton(this.globalCalendarEventsArray, prediction)
            }
          },
          error => console.log(error)
        )
        console.log(this.globalCalendarEventsArray)
      },
      error => console.log(error)
    )
  }

  
  ionViewWillEnter() {
    // this.menu.close('first')
  }

  // Navigation methods
  navigateToUserInfo() {
    this.router.navigateByUrl("/user-info")
  }

  navigateToSettings() {
    console.log("No settings yet")
  }

  navigateToAbout() {
    this.router.navigateByUrl("/about")
  }

  async sync() {
    this.menu.close('first')
    const modal = await this.modalController.create({
      component: SyncPage
    });
    modal.onDidDismiss().then(
      result => this.updateGlobalEvents(true, this.predictionMaxRetries),
      error => console.log(error)
    )
    return await modal.present();
  }



  currentTab = 0
  tabList = ['schedule', 'week', 'month']

  tab = 'schedule';
  show(tab) {
    this.tab = tab;
  }


  DEBUG(message: string, value: any) {
    console.log("[MAIN PAGE]: " + message)
    if (value != undefined && value != null) {
      console.log(value)
    }
  }


  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slideNextTransitionStart: () => {
      if (this.currentTab != 2) {
        this.currentTab++
        this.tab = this.tabList[this.currentTab]
      }
    },
    slidePrevTransitionStart: () => {
      if (this.currentTab != 0) {
        this.currentTab--
        this.tab = this.tabList[this.currentTab]
      }
    }
  };

}
