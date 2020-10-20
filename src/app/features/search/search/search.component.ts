import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserModelService } from 'src/app/shared/services/user-model.service';

// Page for searching for a user a displaying possible matches
@Component({
  selector: 'gu-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchBouncer = new Subject<string>();

  constructor(public model: UserModelService) {}

  ngOnInit(): void {
    // Wait for a pause in the user's typing before sending a request
    this.searchBouncer.pipe(debounceTime(1000)).subscribe(text => this.model.search(text));
  }

}
