import { Injectable } from '@angular/core';
import { UsersApi } from '../api/users.api';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  constructor(private _usersApi: UsersApi) { }

  public getUsers(): Observable<User[]> {
    return this._usersApi.getAll();
  }
}
