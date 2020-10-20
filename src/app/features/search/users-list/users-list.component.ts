import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/classes/user';

// Displays the list of users as a result of searching with the user's input text
@Component({
  selector: 'gu-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit(): void {
  }

}
