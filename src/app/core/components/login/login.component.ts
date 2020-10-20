import { AfterViewInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { UserAccountService } from '../../services/user-account.service';

// Takes care of the login process. If the environment variable for logging in is not configured
// to use Firebase login, then this will set the user's login state to true and the program will
// continue as if there was no login process. 
@Component({
  selector: 'gu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  constructor(private account: UserAccountService, private zone: NgZone) {}

  ngAfterViewInit() {
    // Start the login process or fake it if in dev mode
    this.account.useFirebase ? this.initFirebase() : this.account.login();
  }

  // Init firebase and start its login interface
  private initFirebase() {
    // using dynamic imports to ensure that they are loaded only when needed
    import('firebaseui').then(firebaseui => {
      import('firebase/auth').then(() => {
        import('firebase/app').then(firebase => {
          import('./firebaseConfig.json').then(data => {
        
            // There is no way of testing if there is an existing AuthUi object so we have to
            // save it globally and recreating causes an error. The problem arises when logging
            // out and then in again.
            let ui = window['getUsersAuthUi'];

            if (!ui) {
              firebase.initializeApp((data as any).default);
              ui = new firebaseui.auth.AuthUI(firebase.auth());
              window['getUsersAuthUi'] = ui;
            }

            // config for the ui
            const firebaseUiAuthConfig: firebaseui.auth.Config = {
              callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                  this.zone.run(() => this.account.login());
                  return false;
                }
              },
              signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID, {
                  requireDisplayName: false,
                  provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
                }
              ],
              credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
            };

            // Start the firebase ui. It uses the id of a div in the html file to position itself.
            // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
            ui.start('#firebase-ui-authcontainer', firebaseUiAuthConfig);
          });
        });
      });
    });
  }
  
}
