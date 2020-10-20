import { Component } from '@angular/core';
import { UserAccountService } from 'src/app/core/services/user-account.service';

@Component({
  selector: 'gu-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public account: UserAccountService) {}

}
