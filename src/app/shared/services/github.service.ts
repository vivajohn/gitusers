import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../classes/user';

// Encapsulates calls to the GitHub API
@Injectable({
  providedIn: 'root'
})
export class GithubService {

  readonly EventsPageSize = 30;

  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  // Search for users
  search(text: string): Observable<User[]> {
    if (!text) {
      return of([]);
    }
    return this.get(`search/users?q=${encodeURI(text)}&per_page=10`).pipe(map(data => {
      const list: any[] = data?.items;
      if (list?.length > 0) {
        return list.map(x => new User(x.id, x.login, x.avatar_url));
      }
      return [];
    }));
  }

  // Returns events for max the last 90 days with a fixed page size of 30
  // and max total fetch size of 300. 'per_page' not supported here.
  // ref: https://docs.github.com/en/free-pro-team@latest/rest/reference/activity#events
  events(userName: string, page = 0): Observable<any[]> {
    return this.get(`users/${userName}/events?page=${page}`).pipe(catchError(err => {
      throw err;
    }), map((data: any[]) => {
      const list = [];
      data.forEach(x => {
        const item = { date: new Date(Date.parse(x.created_at)), actions: 1, type: x.type, id: x.id };
        if (x.payload.commits) {
          x.actions = x.payload.commits.length;
        }
        list.push(item);
      });
      return list;
    }));
  }

  private get(method: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${method}`);
  }
}
