import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { PlatformIndependentEvent } from 'src/app/model/platform-independent-model';
import { StorageService } from '../storage/storage-service.service';
import { CalendarEvent } from 'src/app/model/event';
import { Classifier } from './classifier/classifier'



@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private storage: StorageService) {
  }

  private userRelatedStorageData: any;

  proccessEventsForApi(events: PlatformIndependentEvent[]): Promise<CalendarEvent[]> {
    return new Promise<CalendarEvent[]>((resolve, reject) => {
      this.storage.getUserData().then(
        userData => {
          // get userData
          let untypedUserData = userData as any;
          if (untypedUserData.attendeeEventsAttendeeMappings === undefined) {
            untypedUserData.attendeeEventsAttendeeMappings = {};
          }
          // process userData

          let processingResult = this.processEventsInternal(untypedUserData.attendeeEventsAttendeeMappings, events);

          untypedUserData.attendeeEventsAttendeeMappings = processingResult.newMapping;
          let calendarEvents = processingResult.formatedEvents;

          // save userData
          this.storage.saveUserData(untypedUserData).then(
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
      calendarEvent.event_id = 1;
      calendarEvent.is_organizer = false;
      calendarEvent.start_time = platformEvent.startDate;
      calendarEvent.end_time = platformEvent.endDate;
      calendarEvent.location = platformEvent.location;
      // Step two: resolve user mappings
      calendarEvent.participants = [];
      platformEvent.attendees.forEach(attendee => {
        if (attendee.type === undefined || attendee.type !== "Resource") {
          let part_id;
          let part_present = false;
          let part_organizer = false;

          if (attendee.status === "Accepted") { // should probably check for other types of values
            part_present = true;
          }

          let currentAttendeeHash = this.hashCode(attendee.name + attendee.email);
          if (currentAttendeeMappings[currentAttendeeHash] === undefined) {
            currentAttendeeMappings[currentAttendeeHash] = {
              name: attendee.name,
              email: attendee.email
            }
          }

          part_id = currentAttendeeHash;

          calendarEvent.participants.push({
            participant_id: part_id,
            is_present: part_present,
            is_organizer: part_organizer,
          });
        }
      });

      // Step three: apply topic classification
      calendarEvent.topic = platformEvent.title;
      processingResult.formatedEvents.push(calendarEvent);
    });
    return processingResult;
  }

  private hashCode(str) {
    return str.split('').reduce((prevHash, currVal) =>
      (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
  }

  private classify() {
    Classifier.classify();
  }
}
