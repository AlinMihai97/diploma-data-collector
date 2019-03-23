import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-setup',
  templateUrl: './first-setup.page.html',
  styleUrls: ['./first-setup.page.scss'],
})
export class FirstSetupPage implements OnInit {

  pagesArray = [
    "calendar-select",
    "email-select",
    "timespan-select"
  ]
  nextButtonDisabled = false;
  backButtonDisabled = true;
  currentIndex = 0;

  constructor(private router: Router) { 
    this.nextButtonDisabled = false;
    this.backButtonDisabled = true;
  }
  ngOnInit() {}

  backPage() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
      this.router.navigateByUrl("/first-setup/" + this.pagesArray[this.currentIndex])
    }
    this.checkButtons();
  }
  nextPage() {
    if(this.currentIndex <= 1) {
      this.currentIndex++;
      this.router.navigateByUrl("/first-setup/" + this.pagesArray[this.currentIndex])
    } else {
      // navigate to data upload page
    }
    this.checkButtons()
  }

  checkButtons() {
    if(this.currentIndex == 0) {
      this.nextButtonDisabled = false;
      this.backButtonDisabled = true;
    } else if (this.currentIndex == 2) {
      this.nextButtonDisabled = true;
      this.backButtonDisabled = false;
    } else {
      this.nextButtonDisabled = false;
      this.backButtonDisabled = false;
    }
  }
}
