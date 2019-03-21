import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-cal-details',
  templateUrl: './cal-details.page.html',
  styleUrls: ['./cal-details.page.scss'],
})
export class CalDetailsPage implements OnInit {
  ngOnInit(): void {
    this.calName = this.route.snapshot.paramMap.get('name')
  }
  calName = '';
  events = [];
  crossPlatformEvents = [];

  constructor(private route: ActivatedRoute, public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
    if (this.plt.is('ios')) {
      this.calendar.findAllEventsInNamedCalendar(this.calName).then(data => {
        this.crossPlatformEvents = this.formatIos(data);
        console.log(this.crossPlatformEvents);
      });
    } else if (this.plt.is('android')) {
      let start = new Date();
      let end = new Date();
      end.setDate(end.getDate() + 31);
      
      this.calendar.listEventsInRange(start, end).then(data => {
        this.crossPlatformEvents = this.formatAndroid(data);
        console.log(data);
        // console.log(this.crossPlatformEvents);
      });
    }
  }

  formatIos(data) {
    let returnArray = [];
    data.forEach(element => {
      let newElem = {
        title: element.title,
        startDate: (new Date(element.startDate)).toTimeString(),
        endDate: (new Date(element.endDate)).toTimeString(),
        location: element.location
      }
      returnArray.push(newElem);
    });
    return returnArray;
  }

  formatAndroid(data) {
    let returnArray = [];
    data.forEach(element => {
      let newElem = {
        title: element.title,
        startDate: (new Date(element.dtstart)).toTimeString(),
        endDate: (new Date(element.dtend)).toTimeString(),
        location: element.location
      }
      returnArray.push(newElem);
    });
    return returnArray;
  }
}
