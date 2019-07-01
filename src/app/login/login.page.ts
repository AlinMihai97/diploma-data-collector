import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage/storage-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private auth: AuthService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  private openLoginPage() {
    this.auth.getAuthToken().then(
      token => {
        this.storage.checkIfUserSetupExists().then(
          returnedValue => {
            console.log(returnedValue)
            if (returnedValue === false) {
              console.log("[LOGIN PAGE] Setup needed")
              this.router.navigate(['first-setup']);
            } else {
              console.log("[LOGIN PAGE] Setup not needed continuing flow")
              this.router.navigate(["verify-api"])
            }
          },
          error => console.log("[LOGIN PAGE] Storage error" + error)
        )
      },
      error => console.log("Auth error")
    )
  }
}
