import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

// Display a small dialog at the bottom of the screen containing an error message
@Component({
  selector: 'gu-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string, public snackBar: MatSnackBar) { }

}
