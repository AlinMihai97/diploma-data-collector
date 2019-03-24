import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { NavController, Platform } from '@ionic/angular'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  ngOnInit(): void {
    if (this.firstSetup()) {
      this.router.navigate(['first-setup']);
    }
  }
  calendars = [];
  constructor(private router: Router) {
  }
  firstSetup() {
    return true;
  }
}
