import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventManagerService } from '../services/event-manager/event-manager.service';
import { InterfaceEventInfo } from '../model/interface-event-info';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.page.html',
  styleUrls: ['./event-view.page.scss'],
})
export class EventViewPage implements OnInit {

  event_id: string = ""
  interfaceEvent: InterfaceEventInfo = undefined

  event = {
    title: "",
    location: "",
    line1Date: "",
    line2Date: "",
    calendar: "",
    organizer: "",
    attendessInfo: [],
    apiTopic: "",
    eventId: "",
    prediction: {
      eventWithPrediction: false,
      hasPrediction: false,
      value: 0
    },
    is_organizer: true,
  }

  feedback = [
    {
      headerName: "Overall stress",
      feedbackField: "overall",
      value: 0,
      foundValue: 0
    },
    {
      headerName: "Starting time stress",
      feedbackField: "start_time",
      value: 0,
      foundValue: 0
    },
    {
      headerName: "Ending time stress",
      feedbackField: "end_time",
      value: 0,
      foundValue: 0
    },
    {
      headerName: "How stressful is the topic?",
      feedbackField: "topic",
      value: 0,
      foundValue: 0
    },
    {
      headerName: "How stressful is the location?",
      feedbackField: "location",
      value: 0,
      foundValue: 0
    },
    {
      headerName: "How stressed do you feel as an organizer?",
      feedbackField: "is_organizer",
      value: 0,
      foundValue: 0
    }
  ]

  feedbackButtonDisabled = true
  shouldDisplayTwoDates: boolean = false

  daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  constructor(private route: ActivatedRoute, private eventManager: EventManagerService) {
    this.route.params.subscribe(
      params => {
        let event_id = params['id']
        this.eventManager.getGlobalCalendarEventsArray().then(
          eventsArray => {
            this.interfaceEvent = eventsArray.find(event => event.deviceEvent.event_id == event_id)
            if (this.interfaceEvent === undefined) {
              // do some error treating
            } else {
              this.event.title = this.interfaceEvent.deviceEvent.title
              this.event.location = this.interfaceEvent.deviceEvent.location

              let startDate = new Date(this.interfaceEvent.deviceEvent.startDate)
              let endDate = new Date(this.interfaceEvent.deviceEvent.endDate)

              if (startDate.getDay() == endDate.getDay() &&
                startDate.getMonth() == endDate.getMonth() &&
                startDate.getFullYear() == endDate.getFullYear()) {

                this.shouldDisplayTwoDates = false
                this.event.line1Date = "" + this.daysOfWeek[startDate.getDay()] + ", "
                this.event.line1Date += startDate.getDate() + " "
                this.event.line1Date += this.monthsOfYear[startDate.getMonth()] + " "
                this.event.line1Date += startDate.getFullYear()

                this.event.line2Date += startDate.getHours() + ":" + this.getMinutesString(startDate.getMinutes()) + " - "
                this.event.line2Date += endDate.getHours() + ":" + this.getMinutesString(endDate.getMinutes()) + " "
                this.event.line2Date += this.getTimeZoneStirng(endDate.getTimezoneOffset())

              } else {
                // rethink a bit here
                this.event.line1Date = "" + this.daysOfWeek[startDate.getDay()] + ", "
                this.event.line1Date += startDate.getDate() + " "
                this.event.line1Date += this.monthsOfYear[startDate.getMonth()] + " "
                this.event.line1Date += startDate.getFullYear()

                this.event.line1Date += " starting " + startDate.getHours() + ":" + this.getMinutesString(startDate.getMinutes()) + " - "
                this.event.line1Date += endDate.getHours() + ":" + endDate.getMinutes()

                this.event.line2Date = "" + this.daysOfWeek[endDate.getDay()] + ", "
                this.event.line2Date += endDate.getDate() + " "
                this.event.line2Date += this.monthsOfYear[startDate.getMonth()] + " "
                this.event.line2Date += endDate.getFullYear()

                this.event.line2Date += " starting " + endDate.getHours() + ":" + this.getMinutesString(endDate.getMinutes()) + " - "
                this.event.line2Date += endDate.getHours() + ":" + endDate.getMinutes() + " "
                this.event.line2Date += this.getTimeZoneStirng(endDate.getTimezoneOffset())
              }

              this.event.calendar = this.interfaceEvent.deviceEvent.calendarName
              this.event.organizer = this.interfaceEvent.deviceEvent.organizerEmail

              this.event.attendessInfo = []

              this.interfaceEvent.deviceEvent.attendees.forEach(attendee => {

                let newAttendeeObject: {
                  name: string,
                  email: string,
                  status: string
                } = {
                  name: "",
                  email: "",
                  status: ""
                }

                newAttendeeObject.email = attendee.email
                newAttendeeObject.name = attendee.name
                newAttendeeObject.status = attendee.status

                if (!(newAttendeeObject.email == "" && newAttendeeObject.name == "" && newAttendeeObject.status == "")) {
                  if (!(newAttendeeObject.email == undefined && newAttendeeObject.name == undefined && newAttendeeObject.status == undefined)) {
                    this.event.attendessInfo.push(newAttendeeObject)
                  }
                }

              })
              this.event.apiTopic = this.interfaceEvent.apiEvent.topic
              this.event.eventId = this.interfaceEvent.apiEvent.event_id

              if (this.interfaceEvent.prediction.hasPrediction) {
                this.event.prediction = this.interfaceEvent.prediction
              }
              this.event.is_organizer = this.interfaceEvent.apiEvent.is_organizer

              this.initFeedback()
            }
          },
          error => console.log(error)
        )
      },
      error => console.log(error),
      () => "Route params finaliazed"
    )
  }

  ngOnInit() {
  }

  private getMinutesString(minutes) {
    if (minutes < 10)
      return "0" + minutes

    return "" + minutes
  }

  private getTimeZoneStirng(offset) {
    let returnValue = "UTC"
    if (offset < 0) {
      returnValue += "+"
      offset = offset * -1
    } else {
      returnValue += "-"
    }

    return returnValue + Math.floor(offset / 60) + ":" + this.getMinutesString(offset % 60)
  }

  private initFeedback() {
    // get data from server
    this.feedback.forEach(fb => {
      fb.value = 0
      fb.foundValue = 0
    })
  }

  private feedbackChanged() {
    let valuesDiffer = false
    this.feedback.forEach(fb => {
      if (fb.value !== fb.foundValue) {
        valuesDiffer = true
      }
    })

    if(valuesDiffer) {
      this.feedbackButtonDisabled = false
    } else {
      this.feedbackButtonDisabled = true
    }

  }

  private sendFeedback() {
    // send data to server on success run the code
    this.feedback.forEach(fb => {
      fb.foundValue = fb.value
    })
    this.feedbackButtonDisabled = true
  }
}
