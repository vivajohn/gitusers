import { Component } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { UserAccountService } from './core/services/user-account.service';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'gu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(private account: UserAccountService, private router: Router) {

    // Startup sequence: login then go to the appropriate page
    const s = router.events
      .pipe(filter(event => event instanceof NavigationStart), first())
      .subscribe((event: NavigationStart) => {
        if (event.url !== '/' && !event.url.includes('login')) {
          // The user has typed a path into the address bar. Save it so we can
          // use after the login process. (Firebase refreshes the page so we have
          // to save it in session storage.)
          sessionStorage.setItem("loginUrl", event.url);
        }
        this.router.navigate(['login']);
        account.isLoggedIn.pipe(filter(b => b), first()).subscribe(isLoggedIn => {
          if (isLoggedIn) {
            let url = sessionStorage.getItem("loginUrl");
            if (!url) {
              url = 'search'
            } else {
              sessionStorage.removeItem("loginUrl");
            }
            this.router.navigate([url]);
            s.unsubscribe();

            // Now wait for logout event
            account.isLoggedIn.pipe(filter(b => !b)).subscribe(() => {
              this.router.navigate(['login']);
            });
          }
        });
      });
  }

}
