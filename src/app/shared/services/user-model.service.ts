import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeWhile } from 'rxjs/operators';
import { Action } from '../classes/action';
import { User } from '../classes/user';
import { GithubService } from './github.service';

// Service which mediates between the view code and the low-level calls to the backen
@Injectable({
  providedIn: 'root'
})
export class UserModelService {

  searchText: string = '';
  users$?: Observable<User[]>;

  constructor(private github: GithubService) {}

  search(text: string) {
    this.searchText = text;
    this.users$ = this.github.search(text).pipe(map(users => {
      // This map call has the effect of cancelling any previous requests in
      // case they are slow to respond.
      return users;
    }));
  }

  getUser(name: string) {
    let obs: Observable<User[]>;
    if (this.users$) {
      // Check the existing list for the user: get it from the server if not found.
      obs = this.findUser(name, this.users$).pipe(switchMap(user => {
        return user ? of([user]) : this.github.search(name);
      }));
    } else {
      obs = this.github.search(name);
    }
    return this.findUser(name, obs);
  }

  // Search for a particulr user in an observable list of users
  private findUser(name: string, obs: Observable<User[]>): Observable<User> {
    return obs.pipe(map(users => {
      return users.find(x => x.login === name);
    }));
  }
  
  // Gets the activity (the number of actions on GitHub) for the user
  getActivity(userName: string): Observable<Action[]> {
    const s = new Subject<Action[]>();
    const done = new BehaviorSubject<boolean>(false);
    let page = 0;

    // GitHub returns a certain number of records per call, so we repeat the calls
    // until we have all the data for the given time period.
    done.pipe(takeWhile(isDone => !isDone)).subscribe(()=> {
      this.github.events(userName, page).subscribe(list => {
        let actions = list.map(x => new Action(x.date, x.actions, x.id));
        s.next(actions);
        if (actions.length === 0 || actions.length < this.github.EventsPageSize) {
          // Finished getting data
          s.complete();
          done.next(true);
          done.complete();
        }
        page++;
        done.next(false);
      });
    });

    return s;
  }

}
