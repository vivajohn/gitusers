import { AfterContentInit, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/classes/user';
import { UserModelService } from 'src/app/shared/services/user-model.service';

// The user details page
@Component({
  selector: 'gu-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements AfterContentInit {

  user?: User;
  isLoaded = false;

  constructor(private route: ActivatedRoute, private model: UserModelService, private zone: NgZone) { }

  ngAfterContentInit() {
    this.route.paramMap.subscribe(params => {
      const name = params.get('id');
      this.model.getUser(name).subscribe(user => this.user = user);
    });
  }

  imageLoaded() {
    this.zone.run(() => this.isLoaded = true);
  }
}
