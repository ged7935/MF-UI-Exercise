import { Injectable } from '@angular/core';
import { UserPostsFacade } from '../facade/userPosts.facade';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: string[] = [];

  constructor(private userPostsFacade: UserPostsFacade) { 
    this.userPostsFacade.postAction$
      .subscribe((type) => { this.notifications.push(type); });
  }

  public getLatest(): string {
    return this.notifications.pop();
  }
  
}
