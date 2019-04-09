import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.page.html',
  styleUrls: ['./data-upload.page.scss'],
})
export class DataUploadPage implements OnInit {

  itemList = [
    {
      loadingText: "Checking User",
      succesText: "User Registered",
      displayClass: "",
      work: function() {

      },
      isLoading: true,
      isSucces: false
    },
    {
      loadingText: "Checking User",
      succesText: "User Registered",
      displayClass: "",
      isLoading: true,
      isSucces: false
    },
    {
      loadingText: "Checking User",
      succesText: "User Registered",
      displayClass: "",
      isLoading: true,
      isSucces: false
    },
    {
      loadingText: "Checking User",
      succesText: "User Registered",
      displayClass: "",
      isLoading: true,
      isSucces: false
    }
  ]
  hideClassName = "hideItem"
  showClassName = "fadeIn"
  constructor() {
    this.itemList.forEach(item =>
    {
      item.displayClass = this.hideClassName;
    });
    this.doProcess(0);
   }

  ngOnInit() {
  }

  doProcess(itemIndex) {
    if(itemIndex < this.itemList.length) {
      let currentItem = this.itemList[itemIndex];
      currentItem.displayClass = this.showClassName;
      setTimeout(() => {
        currentItem.isLoading = false;
        currentItem.isSucces = true;
        this.doProcess(itemIndex+1);
      }, 2000);
    }
  }
}
