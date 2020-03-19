import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersApi {
  private readonly usersUrl: string = "https://jsonplaceholder.typicode.com/users";

  constructor(private _httpClient: HttpClient) { }

  public getAll(): Observable<User[]> {    
    return this._httpClient.get<User[]>(this.usersUrl).pipe(first());
  }

  public get(userId: number): Observable<User> {
    return this._httpClient.get<User>(`${this.usersUrl}/${userId}`).pipe(first());
  }

}
