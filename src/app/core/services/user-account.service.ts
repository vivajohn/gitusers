import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private log = new ReplaySubject<boolean>(1);
  get isLoggedIn(): Observable<boolean> { return this.log; }

  // Will be set with value from environment file
  useFirebase = false;

  constructor() { 
    this.useFirebase = environment.firebaseLogin;
    this.log.next(
      this.useFirebase ? !!sessionStorage.getItem("isLoggedIn") : true
    );
  }

  login() {
    sessionStorage.setItem('isLoggedIn', 'true');
    this.log.next(true);
  }

  logout() {
    if (this.useFirebase) {
      sessionStorage.removeItem('isLoggedIn');
    }
    this.log.next(false);
  }

}
