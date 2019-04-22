import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  openFititAuthPage() {
     Browser.open({ url: 'http://capacitor.ionicframework.com/' });
  }
}
