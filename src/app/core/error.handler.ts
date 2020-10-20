import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ErrorComponent } from './components/error/error.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

// Global error handler
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector, private zone: NgZone) { }

  handleError(error) {
    if (!error?.message) {
      error = new Error(error.toString());
    }

    // Instantiate a snack bar for displaying the error message
    const snackBar = this.injector.get(MatSnackBar);
    this.zone.run(() => snackBar.openFromComponent(ErrorComponent, { data: error.message }));

    if (environment.production) {
      console.error(error.message);
    } else {
      throw error;
    }
  }
  
}
