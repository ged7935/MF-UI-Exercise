import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersFacade, User } from 'src/app/user/user.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")));

  constructor(private usersFacade: UsersFacade) {  }  

  public get loggedInUser$(): Observable<User> {
    return this.loggedInUserSubject.asObservable();
  }

  public get loggedInUser(): User {
    return this.loggedInUserSubject.value;
  }

  public logIn(username: string): Observable<boolean> {
    return this.usersFacade.getUsers()
      .pipe(
        map(users => {
          let user = users.find(u => u.username === username);
          if(user){
            localStorage.setItem("user", JSON.stringify(user));
            this.loggedInUserSubject.next(user);
          }
          return user ? true : false 
        }),
      )
  }

  public logOut(): void {
    localStorage.removeItem("user");
    this.loggedInUserSubject.next(null);
  }
}
