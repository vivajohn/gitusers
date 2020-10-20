import { Component, EventEmitter, Input, Output } from '@angular/core';

// The search box in the search page
@Component({
  selector: 'gu-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @Input() text: string;
  
  @Output() output = new EventEmitter<string>();

}
