import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(private menu: MenuController, private router: Router) {
    this.menu.enable(true, 'first');
  }

  openFirst() {
    this.menu.open('first');
  }

  ngOnInit() {
    console.log("init")
  }


  // Navigation methods
  ionViewWillEnter() {
    this.menu.close('first')
  }

  navigateToUserInfo() {
    this.router.navigateByUrl("/user-info")
  }

  navigateToSettings() {

  }

  navigateToAbout() {
    this.router.navigateByUrl("/about")
  }

  tab = 'calendar';
  show(tab) {
    this.tab = tab;
  }
}
