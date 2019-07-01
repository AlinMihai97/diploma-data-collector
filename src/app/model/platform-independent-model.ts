import { EventManager } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';



export class PlatformIndependentEvent {

    event_id: string;
    title: string;
    startDate: number;
    endDate: number;
    lastModified: number;
    location: string;
    calendarName: string;
    source: string;
    attendees: any[] = [];
    organizerEmail: string;

    static getEventArayFromData(data, platform: Platform): PlatformIndependentEvent[] {
        var eventArray = [];
        console.log("From device came the following events: ")
        console.log(data)
        data.forEach(element => {
            var event = new PlatformIndependentEvent();

            if (platform.is('ios') || platform.is('android')) {
                event.event_id = this.getVal(element.id) + "-sdate-" + this.parseIosDateToUtc(this.getVal(element.startDate));
                event.title = this.getVal(element.title);
                event.startDate = this.parseIosDateToUtc(this.getVal(element.startDate));
                event.endDate = this.parseIosDateToUtc(this.getVal(element.endDate));
                event.source = 'ios';
                event.calendarName = this.getVal(element.calendar);
                event.location = this.getVal(element.location);
                event.lastModified = this.parseIosDateToUtc(this.getVal(element.lastModifiedDate))
                if (element.organizer == undefined) {
                    event.organizerEmail = ""
                } else {
                    event.organizerEmail = element.organizer.startsWith("mailto:") ? element.organizer.substring(7) : element.organizer
                }
                if (element.attendees !== undefined) {
                    element.attendees.forEach(attendeesElement => {
                        if (attendeesElement !== {}) {
                            let attendeesObj = {
                                status: this.getVal(attendeesElement.status),
                                name: this.getVal(attendeesElement.name),
                                type: this.getVal(attendeesElement.type),
                                role: this.getVal(attendeesElement.role),
                                email: ""
                            }

                            if (attendeesElement.URL != undefined) {
                                attendeesObj.email = attendeesElement.URL.startsWith("mailto:") ? attendeesElement.URL.substring(7) : attendeesElement.URL
                            } else if(attendeesElement.email != undefined) {
                                attendeesObj.email = attendeesElement.email.startsWith("mailto:") ? attendeesElement.email.substring(7) : attendeesElement.email
                            }

                            event.attendees.push(attendeesObj);
                        }
                    });
                } else {
                    event.attendees = []
                }


            } 
            if (event.startDate != 0 && event.endDate != 0) {
                eventArray.push(event);
            }
        });
        return eventArray;
    }

    private static parseIosDateToUtc(iosDate: string) {
        if (iosDate === "") {
            return 0;
        }
        var [date, time] = iosDate.split(" ");
        var [hour, minutes, seconds] = time.split(":")
        var [year, month, day] = date.split("-")
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minutes), parseInt(seconds)).getTime()
    }

    private static getVal(field) {
        if (field !== undefined) {
            return field
        } else {
            return ""
        }
    }
}
