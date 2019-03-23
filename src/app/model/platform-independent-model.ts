import { EventManager } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

export class PlatformIndependentEvent {

    title = "";
    startDate = "";
    endDate = "";
    location = "";
    calendarName = "";
    source = "";
    attendees = [];

    static getEventArayFromData(data, platform : Platform): PlatformIndependentEvent[] {
        var eventArray = [];
        data.forEach(element => {
            var event = new PlatformIndependentEvent();
            
            if(platform.is('ios')) {
                event.title = element.title;
                event.startDate = element.startDate;
                event.endDate = element.endDate;
                event.source = 'ios';
                event.calendarName = element.calendar;
                event.location = element.location;
                element.attendees.forEach(attendeesElement => {
                    event.attendees.push({
                        status: attendeesElement.status,
                        name: attendeesElement.name,
                        email: attendeesElement.URL.startsWith("mailto:") ? attendeesElement.URL.substring(7) : attendeesElement,
                        type: attendeesElement.type,
                        role: attendeesElement.role
                    });
                });
                
            } else if(platform.is('android')) {
                // remeber to implement this
            }

            eventArray.push(event);
        });
        return eventArray;
    }
}
