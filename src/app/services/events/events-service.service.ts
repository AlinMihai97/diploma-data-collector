import { Injectable } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';
import { StorageService } from '../storage/storage-service.service';
import { CalendarEvent } from 'src/app/model/event';
import { ClassifierService } from '../classifier/classifier.service';



@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private storage: StorageService, private classifier: ClassifierService) {
  }

  private userRelatedStorageData: any;
  private userEmail: string = ""


  proccessEventsForApi(events: PlatformIndependentEvent[]): Promise<CalendarEvent[]> {
    return new Promise<CalendarEvent[]>((resolve, reject) => {
      this.storage.getCalendarEmail().then(
        currentUserEmail => {
          console.log("[EVENTS SERVICE] Current user email from storage is: " + currentUserEmail)
          this.userEmail = currentUserEmail
          this.storage.getAttendeeEventsAttendeeMappings().then(
            userData => {
              // get userData
              let attendeeEventsAttendeeMappings = userData as any;
              if (attendeeEventsAttendeeMappings === undefined) {
                attendeeEventsAttendeeMappings = {};
              }
              // process userData
              let processingResult = this.processEventsInternal(attendeeEventsAttendeeMappings, events);

              attendeeEventsAttendeeMappings = processingResult.newMapping;
              let calendarEvents = processingResult.formatedEvents;

              // save userData
              this.storage.setAttendeeEventsAttendeeMappings(attendeeEventsAttendeeMappings).then(
                result => {
                  console.log("[EVENTS SERVICE]: saved the following user model: " + result)
                  resolve(calendarEvents);
                },
                error => {
                  console.log("[EVENTS SERVICE] error saving user data to local storage");
                  reject(error);
                }
              )
            },
            error => {
              console.log("[EVENTS SERVICE] error when getting user data from local storage");
              reject(error);
            }
          )
        },
        error => reject(error)
      )

    });

  }

  private processEventsInternal(currentAttendeeMappings, events: PlatformIndependentEvent[]): { formatedEvents: CalendarEvent[], newMapping: {} } {

    let processingResult = {
      formatedEvents: [],
      newMapping: currentAttendeeMappings
    }

    events.forEach(platformEvent => {
      // Three step algorithm
      let calendarEvent = new CalendarEvent();

      // Step one: map from PlatformIndependentEvent (device event) to CalendarEvent (api event)
      calendarEvent.event_id = platformEvent.event_id;
      calendarEvent.start_time = Math.floor(platformEvent.startDate / 1000);
      calendarEvent.end_time = Math.floor(platformEvent.endDate / 1000);
      calendarEvent.last_modified = Math.floor(platformEvent.lastModified / 1000);

      calendarEvent.location = platformEvent.location;
      // Step two: resolve user mappings
      calendarEvent.participants = [];

      // search for organizer in the attendees list
      calendarEvent.is_organizer = false

      let attendesArray = platformEvent.attendees
      let foundAtt = attendesArray.find(attendee => {
        return attendee.email === platformEvent.organizerEmail
      })

      if (foundAtt == undefined) {
        // organizer not found in the attendes list, adding him now, he will be found as organizer

        if (platformEvent.organizerEmail !== this.userEmail) {
          attendesArray.push({
            type: "Organizer",
            email: platformEvent.organizerEmail,
            name: "organizer",
            status: "1"
          })
        } else {
          calendarEvent.is_organizer = true
        }
      } else if (foundAtt.email === this.userEmail) {
        calendarEvent.is_organizer = true
        // if the organizer is found in the attendees and the organizer is the user then we set him as organizer and don't add him to the list because he will be removed anyway
      }

      console.log("these are the event attendees: ", platformEvent.attendees)
      attendesArray.forEach(attendee => {
        if (attendee.type !== "Resource") {
          if (attendee.email != this.userEmail) {
            let part_id;
            let part_present = false;
            let part_organizer = attendee.email == platformEvent.organizerEmail;


            if (attendee.status === "Accepted" || attendee.status == "1") { // should probably check for other types of values
              part_present = true;
            }

            let currentAttendeeHash = this.hashCode(attendee.name + attendee.email);
            if (currentAttendeeMappings[currentAttendeeHash] === undefined) {
              currentAttendeeMappings[currentAttendeeHash] = {
                name: attendee.name,
                email: attendee.email
              }
            }

            part_id = currentAttendeeHash + "";

            calendarEvent.participants.push({
              participant_id: part_id,
              is_present: part_present,
              is_organizer: part_organizer,
            });
          } else {
            console.log("[EVENTS SERVICE] The current user was in the attendees list, skipping it")
            // Should check if the user accepted the meeting and not add the event if so
          }
        }
      });

      if (calendarEvent.participants.length === 0) {
        // There are no participants in the list that means that the event must be created by the user
        calendarEvent.is_organizer = true
      }

      // Step three: apply topic classification
      calendarEvent.topic = this.classifier.classify(platformEvent.title);
      processingResult.formatedEvents.push(calendarEvent);
    });
    return processingResult;
  }

  private hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
  }
}
