import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { ActivatedRoute} from '@angular/router'
import { PlatformIndependentEvent } from '../model/platform-independent-model';

@Component({
  selector: 'app-cal-details',
  templateUrl: './cal-details.page.html',
  styleUrls: ['./cal-details.page.scss'],
})
export class CalDetailsPage implements OnInit {

  calName = '';
  events = [];
  crossPlatformEvents : PlatformIndependentEvent[] = [];


  ngOnInit(): void { 
    this.calName = this.route.snapshot.paramMap.get('name')

    // if (this.plt.is('ios')) {
    //   this.calendar.findAllEventsInNamedCalendar(this.calName).then(data => {
    //     console.log(data);
    //     this.crossPlatformEvents = PlatformIndependentEvent.getEventArayFromData(data, this.plt)
    //     console.log(this.crossPlatformEvents)
    //   });
    // } else if (this.plt.is('android')) {
    //   let start = new Date();
    //   let end = new Date();
    //   end.setDate(end.getDate() + 31);
      
    //   this.calendar.listEventsInRange(start, end).then(data => {
    //     this.crossPlatformEvents = PlatformIndependentEvent.getEventArayFromData(data, this.plt)
    //   });
    // }
  }
  
  constructor(private route: ActivatedRoute, public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
    this.route = route;
    this.navCtrl = navCtrl;
    this.calendar = calendar;
    this.plt = plt;
  }

  
}
