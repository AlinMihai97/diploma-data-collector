import { EventManager } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';



export class PlatformIndependentEvent {

    event_id: string;
    title = "";
    startDate: number;
    endDate: number;
    location = "";
    calendarName = "";
    source = "";
    attendees = [];
    organizerEmail = ""

    static getEventArayFromData(data, platform: Platform): PlatformIndependentEvent[] {
        var eventArray = [];
        console.log("From device came the following events: ")
        console.log(data)
        data.forEach(element => {
            var event = new PlatformIndependentEvent();

            if (platform.is('ios')) {
                event.event_id = this.getVal(element.id) + "-sdate-" + this.parseIosDateToUtc(this.getVal(element.startDate));
                event.title = this.getVal(element.title);
                event.startDate = this.parseIosDateToUtc(this.getVal(element.startDate));
                event.endDate = this.parseIosDateToUtc(this.getVal(element.endDate));
                event.source = 'ios';
                event.calendarName = this.getVal(element.calendar);
                event.location = this.getVal(element.location);
                event.organizerEmail = this.getVal(element.organizer).startsWith("mailto:") ? this.getVal(element.organizer).substring(7) : this.getVal(element.organizer)

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
                                attendeesObj.email = attendeesElement.URL.startsWith("mailto:") ? attendeesElement.URL.substring(7) : attendeesElement
                            }

                            event.attendees.push(attendeesObj);
                        }

                    });
                }


            } else if (platform.is('android')) {
                // remeber to implement this
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
