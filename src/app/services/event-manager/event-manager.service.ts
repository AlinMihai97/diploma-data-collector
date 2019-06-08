import { Injectable } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';
import { StorageService } from '../storage/storage-service.service';
import { CalendarService } from '../calendar/calendar-service.service';
import { CalendarEvent } from 'src/app/model/event';
import { StressDetectorApiService } from '../stress-detector-api/stress-detector-api-service.service';
import { EventsService } from '../events/events-service.service';
import { InterfaceEventInfo } from 'src/app/model/interface-event-info';
import { Prediction } from 'src/app/model/prediction';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  deviceEventsArray: PlatformIndependentEvent[] = []
  apiEventsArray: CalendarEvent[] = []

  globalCalendarEventsArray: InterfaceEventInfo[] = []

  userDetail = {
    user_id: "",
    calendarName: "",
    calendarId: ""
  }

  datesInfo = {
    pastInfoDate: null,
    setupDate: null,
    sessionStartDate: null,
    futureDate: null
  }
  private daysInFuture = 30 * 2

  constructor(private api: StressDetectorApiService, private storage: StorageService, private calendar: CalendarService, private eventsService: EventsService) {
    this.deviceEventsArray = []
  }

  getCurrentSetupPrediction(): Promise<Prediction> {
    return new Promise<Prediction>((resolve, reject) => {

      let minTime: number = Math.floor(this.datesInfo.sessionStartDate.getTime() / 1000)
      let maxTime: number = Math.floor(this.datesInfo.futureDate.getTime() / 1000)

      this.api.detectInInterval(this.userDetail.user_id, this.userDetail.calendarId, minTime, maxTime).then(
        prediction => {
          console.log("Got the following prediction: ")
          console.log(prediction)
          resolve(prediction)
        },
        error => reject(error)
      )
    })
  }

  updateEventDataWithPrediciton(interfaceEventArray: InterfaceEventInfo[], prediction: Prediction): InterfaceEventInfo[] {
    let newInterfaceEventArray: InterfaceEventInfo[] = []
    if (prediction.prediction_list === undefined || prediction.prediction_list.length <= 0) {
      console.log("No prediction info available")
      return interfaceEventArray
    } else {
      interfaceEventArray.forEach(event => {
        let found_pred = prediction.prediction_list.find(pred => pred.event_id === event.apiEvent.event_id)
        if (found_pred !== undefined && event.prediction.eventWithPrediction) {
          event.prediction.hasPrediction = true
          event.prediction.value = found_pred.heart_rate_delta
        }
        newInterfaceEventArray.push(event)
      })
      return newInterfaceEventArray
    }
  }

  getGlobalCalendarEventsArray() {
    return new Promise<InterfaceEventInfo[]>((resolve, reject) => {
      this.getDeviceEvents().then(
        deviceEvents => {
          this.getApiEvents().then(
            apiEvents => {
              this.globalCalendarEventsArray = []
              deviceEvents.forEach(deviceEvent => {
                let foundApiEvent = apiEvents.find(apiEvent => {
                  return apiEvent.event_id == deviceEvent.event_id
                })

                // AT THIS POINT WE SHOULD GET THE PREDICTION
                let interfaceEvent = new InterfaceEventInfo()
                interfaceEvent.deviceEvent = deviceEvent
                interfaceEvent.apiEvent = foundApiEvent
                interfaceEvent.prediction = {
                  eventWithPrediction: deviceEvent.startDate >= new Date().getTime(),
                  hasPrediction: false,
                  value: undefined
                }

                this.globalCalendarEventsArray.push(interfaceEvent)
              })
              resolve(this.globalCalendarEventsArray)
            },
            error => reject(error)
          )
        },
        error => reject(error)
      )
    })
  }
  sync() {
    let syncInfo: any = {}
    syncInfo.dateInfo = this.datesInfo
    syncInfo.syncStartDate = new Date().getTime()

    return new Promise<any>((resolve, reject) => {
      this.apiEventsArray = []
      this.deviceEventsArray = []

      this.getApiEvents().then(
        apiEvents => {
          syncInfo.originalApIEventsCount = apiEvents.length
          this.getDeviceEvents().then(
            deviceEvents => {
              syncInfo.originalDeviceEventsCount = deviceEvents.length

              // The list of events that will be uploaded to the server
              let uploadList: PlatformIndependentEvent[] = []
              let omittedUploadEventsCount = 0;

              // The list of events that need updates
              let updateList: CalendarEvent[] = []

              // Upload new events
              deviceEvents.forEach((platformEvent) => {
                let searchedEvent = apiEvents.find((apiEvent) => {
                  return apiEvent.event_id == platformEvent.event_id
                })
                if (searchedEvent === undefined) {
                  let alreadyInListEvent = uploadList.find((someEvent) => {
                    return someEvent.event_id == platformEvent.event_id
                  })
                  if (alreadyInListEvent === undefined) {
                    uploadList.push(platformEvent)
                  } else {
                    omittedUploadEventsCount++;
                  }

                } else {
                  // Check if event should be updated

                }
              })
              syncInfo.omittedUploadEventsCount = omittedUploadEventsCount
              syncInfo.uploadCount = uploadList.length
              syncInfo.updateCount = updateList.length

              let eventsToDelete: CalendarEvent[] = []
              // Check if API events on the server are still on device
              apiEvents.forEach(apiEvent => {
                // Find the corresponding device event
                let searchedDeviceEvents = deviceEvents.find(deviceEvent => {
                  return deviceEvent.event_id == apiEvent.event_id
                })
                if (searchedDeviceEvents === undefined) {
                  // API event no longer on device adding it to deletion list
                  eventsToDelete.push(apiEvent)
                }
              })

              syncInfo.eventsRemovedFromApiCount = eventsToDelete.length


              let updateChecked = false
              let uploadChecked = false
              let deleteChecked = false


              let endSyncCallback = () => {
                syncInfo.syncEndDate = new Date().getTime()
                syncInfo.result = true
                resolve(syncInfo)
              }
              let errorCallback = (error) => reject(error)

              let asyncTasksCallback = () => {

                if (!updateChecked) {
                  updateChecked = true
                  if (updateList.length > 0) {
                    this.syncAsyncUpdate(asyncTasksCallback, errorCallback, updateList)
                  } else {
                    asyncTasksCallback()
                  }
                } else if (!uploadChecked) {
                  uploadChecked = true
                  if (uploadList.length > 0) {
                    this.syncAsyncUpload(asyncTasksCallback, errorCallback, uploadList)
                  } else {
                    asyncTasksCallback()
                  }
                } else {
                  deleteChecked = true
                  if (eventsToDelete.length > 0) {
                    this.syncAsyncDelete(endSyncCallback, errorCallback, eventsToDelete)
                  } else {
                    endSyncCallback()
                  }
                }
              }

              // Call this baby up
              asyncTasksCallback()
            },
            error => reject(error)
          )
        },
        error => reject(error)
      )
    })
  }


  getApiEvents(): Promise<CalendarEvent[]> {
    return new Promise<CalendarEvent[]>((resolve, reject) => {
      if (this.apiEventsArray.length != 0) {
        resolve(this.apiEventsArray)
      } else {
        this.updateApiEvents().then(
          apiEvents => resolve(apiEvents),
          error => reject(error)
        )
      }
    })
  }

  getDeviceEvents(): Promise<PlatformIndependentEvent[]> {
    return new Promise<PlatformIndependentEvent[]>((resolve, reject) => {
      if (this.deviceEventsArray.length != 0) {
        resolve(this.deviceEventsArray)
      } else {
        this.updateDeviceEvents().then(
          deviceEvents => resolve(deviceEvents),
          error => reject(error)
        )
      }
    })
  }


  // INTERNAL METHODS

  private syncAsyncUpload(succesCallback, errorCallback, eventsToUpload) {
    console.log("Starting processing for following events")
    this.eventsService.proccessEventsForApi(eventsToUpload).then(
      apiEventList => {
        console.log("Processed the following events: ")
        console.log(apiEventList)
        this.api.addEvents(this.userDetail.user_id, this.userDetail.calendarId, apiEventList).then(
          result => {
            if (result) {
              console.log("Succesfully uploaded " + apiEventList.length + " events")
              succesCallback()
            }
            else {
              errorCallback("Some error when uploading events to API")
            }
          },
          error => errorCallback(error)
        )
      },
      error => errorCallback(error)
    )
  }

  private syncAsyncDelete(succesCallback, errorCallback, eventsToDelete) {
    console.log("Starting deleting old events from API")
    let recursiveDeleteCallback = (index: number) => {
      if (index < eventsToDelete.length) {
        this.api.deleteEvent(this.userDetail.user_id, this.userDetail.calendarId, eventsToDelete[index].event_id).then(
          result => {
            if (result) {
              console.log("Deleted event " + eventsToDelete[index].event_id + " from api")
              recursiveDeleteCallback(index + 1)
            } else {
              errorCallback("Some error when deleting event " + eventsToDelete[index].event_id)
            }
          },
          err => errorCallback(err)
        )
      } else {
        console.log("Succesfully deleted " + eventsToDelete.length + " events from API")
        succesCallback()
      }
    }
    recursiveDeleteCallback(0)
  }

  private syncAsyncUpdate(succesCallback, errorCallback, eventsToUpdate) {
    succesCallback()
  }

  /*
    Returns an object containing user details found in storage
  */
  private getUserDetails() {
    return new Promise<any>((resolve, reject) => {
      console.log(this.userDetail)
      if (this.userDetail.calendarName === "" || this.userDetail.calendarName === "") {
        let userDetail: any = {}
        this.storage.getUserId().then(
          user_id => this.storage.getSelectedCalendarId().then(
            calendarId => {
              userDetail.user_id = user_id
              userDetail.calendarId = calendarId
              this.userDetail = userDetail
              console.log(this.userDetail)
              resolve(userDetail)
            }
          ),
          error => reject(error)
        )
      } else {
        resolve(this.userDetail)
      }
    })
  }

  /*
    Update the local variable for api events

     TO DO: should support storage update and retrieve
  */
  private updateApiEvents(): Promise<CalendarEvent[]> {
    return new Promise<CalendarEvent[]>((resolve, reject) => {
      this.getUserDetails().then(
        userDetails => {
          this.api.getEventList(userDetails.user_id, userDetails.calendarId).then(
            apiEvents => {
              this.apiEventsArray = apiEvents
              resolve(apiEvents)
            },
            error => reject(error)
          )
        },
        error => reject(error)
      )
    })
  }

  /*
    Updates the device events local variable
  */
  private updateDeviceEvents(): Promise<PlatformIndependentEvent[]> {
    return new Promise<PlatformIndependentEvent[]>((resolve, reject) => {
      this.updateDates().then(
        result => {
          this.storage.getSelectedCalendarName().then(
            calendarName => {
              this.calendar.getEventsFromCalendar(result.pastInfoDate, result.futureDate, calendarName).then(
                deviceEvents => {
                  this.deviceEventsArray = deviceEvents
                  resolve(deviceEvents)
                },
                error => {
                  reject(error)
                }
              )
            }
          )
        },
        error => reject(error)
      )
    })
  }

  /*
    Updates the dates object with new dates
  */
  private updateDates() {
    return new Promise<any>((resolve, reject) => {
      if (this.datesInfo.sessionStartDate !== null &&
        new Date().getTime() - this.datesInfo.sessionStartDate.getTime() < 1000 * 60 * 60 * 24) {
        resolve(this.datesInfo)
      } else {
        let newDatesInfoObj: any = {}

        newDatesInfoObj.sessionStartDate = new Date()
        newDatesInfoObj.futureDate = this.addDays(newDatesInfoObj.sessionStartDate, this.daysInFuture)

        this.storage.getSetupDate().then(
          setupDate => {
            this.storage.getTimeInPast().then(
              timeInPast => {
                newDatesInfoObj.setupDate = new Date(setupDate)
                newDatesInfoObj.pastInfoDate = this.addDays(newDatesInfoObj.setupDate, -1 * 7 * timeInPast)
                this.datesInfo = newDatesInfoObj
                console.log(newDatesInfoObj)
                resolve(newDatesInfoObj)
              },
              error => reject(error)
            )
          },
          error => reject(error)
        )
      }
    })
  }

  /*
    Adds a number of days to the received date
  */
  private addDays(date: Date, days: number): Date {
    var newDate = new Date(date.valueOf());
    newDate.setDate(newDate.getDate() + days);
    return newDate
  }
}
