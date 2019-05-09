import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { StorageService } from '../storage/storage-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const { Browser } = Plugins;

@Injectable({
  providedIn: 'root'
})

/**
 * How this service works:
 * 1. Check the current token on localstorage
 * 2. If it does exist go to 3., else go to 4.
 * 3. Check if the stored token is still valid. If valid go to 7., else go to 4
 * 4. Open browser window for new auth session
 * 5. Obtain an parse token info
 * 6. Store new info
 * 7. Succes
 * 
 * All errors during steps 1-6 lead to Failure
 */

export class AuthService {

  private browserListener
  private authorizationBaseUrl = "https://www.fitbit.com/oauth2/authorize?"
  private callbackUrl = "StressDetector://auth"
  private introspectUrl = "https://api.fitbit.com/1.1/oauth2/introspect"

  private authInfo = {
    response_type: "token", // implicit grant flow
    client_id: "22D648",
    redirect_uri: encodeURIComponent(this.callbackUrl),
    scope: encodeURIComponent("activity nutrition heartrate location profile settings sleep social weight"), // all
    expires_in: "31536000"
  }

  constructor(private storage: StorageService, private http: HttpClient) {
    this.browserListener = undefined
  }

  // Main function to be called in this service
  getAuthToken() {

    this.DEBUG("getAuthToken() called", undefined)
    return new Promise((resolve, reject) => {

      this.DEBUG("Getting data from storage", undefined)
      this.storage.getUserData().then(
        (storageData) => {

          this.DEBUG("Got the following data from storage: ", storageData)
          var fieldName = this.storage.getTokenFieldName()

          var succesResultCallback = (resultToken) => {
            this.DEBUG("Returning with result", resultToken)
            resolve(resultToken)
          }

          // Check if there is a token available
          // If not it must be first login or new install
          if (storageData[fieldName] === undefined || storageData === "") {

            this.DEBUG("Token not found on storage, this must be first login", undefined)
            this.openFititAuthFlow(storageData).then(
              succesResultCallback,
              (error) => {
                this.DEBUG("Fitbit auth flow error", undefined)
              }
            )
          } else {
            // check validity
            var storedToken = storageData[fieldName]

            this.DEBUG("Found stored token: ", storedToken)
            this.DEBUG("Checking token validty: ", undefined)

            this.checkTokenValidity(storedToken).then(
              (tokenValid) => {
                this.DEBUG("Validity check finnished with result: ", tokenValid)
                if (tokenValid) {

                  this.DEBUG("Returning stored token", storedToken)
                  resolve(storedToken)
                } else {

                  this.DEBUG("Token not valid, starting auth flow", undefined)
                  this.openFititAuthFlow(storageData).then(
                    succesResultCallback,
                    (error) => {
                      this.DEBUG("Fitbit auth flow error", undefined)
                    }
                  )
                }
              },
              (error) => {
                this.DEBUG("Error when checking validity: ", error)
                reject(error)
              }
            )
          }
        },
        (error) => {
          this.DEBUG("Error when accesing user data from storage: ", error)
          reject(error)
        }
      )
    });
  }

  private openFititAuthFlow(storageInfo) {
    return new Promise((resolve, reject) => {
      this.DEBUG("Removing listener", undefined)
      if (this.browserListener !== undefined) {
        this.browserListener.remove()
      }

      this.DEBUG("Listener removed, registering it again", undefined)
      this.browserListener = Browser.addListener("browserPageLoaded", (info) => {

        this.DEBUG("Browser finnished with url", info)
        // do some parsing of the info
        var parsingResult = this.parseCallbackUrl(info.url)

        this.DEBUG("Storing token info", undefined)
        storageInfo[this.storage.getTokenFieldName()] = parsingResult.token
        this.storage.saveUserData(storageInfo).then(
          (storedObj) => {

            this.DEBUG("Stored the following token: ", storedObj[this.storage.getTokenFieldName()])
            resolve(this.storage.getTokenFieldName())
          },
          (error) => {

            this.DEBUG("Failed to store result with error: ", error)
            reject(error)
          }
        )
      });

      this.DEBUG("Opening browser", undefined)
      Browser.open({ url: this.getAuthroizationUrl() })
    });


  }

  // Checks if the current token is valid
  // TODO: found a way to cache the validity checking so it doesn't depend on Fitbit server
  private checkTokenValidity(token) {
    return new Promise((resolve, reject) => {

      this.DEBUG("Checking token validity", token)
      let headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': "Bearer " + token,
      });

      let body = new HttpParams().set('token', token)
      // fix this call
      this.http.post(this.introspectUrl,
        body.toString(), { headers }).subscribe(
        (response) => {
          this.DEBUG("Fitbit introspect responded with object", response)
          let validity = true
          if(!response["active"]) {
            validity = false
          }
          resolve(validity)
        },
        (error) => {
          console.log(error)
          reject(error)
        },
        () => console.log("Finnished")
      )
    });
  }

  // -------------------HELPER FUNCTIONS------------------
  private getAuthroizationUrl() {
    var authUrl = this.authorizationBaseUrl
    Object.keys(this.authInfo).forEach(key => {
      authUrl += key + "=" + this.authInfo[key] + "&"
    });
    if (authUrl.endsWith("&")) {
      authUrl = authUrl.substr(0, authUrl.length - 1)
    }
    return authUrl
  }

  private parseCallbackUrl(url: String) {

    this.DEBUG("Starting parsing for url: ", url)
    var parsedUrl = url.replace(this.callbackUrl, "")
    var splitedResult1 = parsedUrl.split("access_token=")
    var splitedResult2 = splitedResult1[1].split("&")

    this.DEBUG("Parsed token is: ", splitedResult2[0])
    return {
      token: splitedResult2[0]
    }
  }

  private DEBUG(message, objToPrint) {
    console.log("[AuthService] " + message);
    if (objToPrint !== undefined) {
      console.log(objToPrint)
    }
  }
}
