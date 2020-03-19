import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserPostsFacade } from '../../facade/userPosts.facade';
import { UserPost } from '../../model/userPost.model';
import { AuthService } from 'src/app/core/core.module';
import { User } from 'src/app/user/user.module';
import { NotificationService } from '../../service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit, OnDestroy {
  private readonly POSTS_PER_PAGE = 10;

  private startBound: number = 0;
  private endBound: number = this.POSTS_PER_PAGE;
  private userSub: Subscription;
  private allPosts: UserPost[] = [];

  public displayedPosts: UserPost[] = [];
  public currentUser: User;
  public bannerType: string;

  constructor(private userPostsFacade: UserPostsFacade, private authService: AuthService, private notificationService: NotificationService) {  }

  ngOnInit(): void {
    this.bannerType = this.notificationService.getLatest();

    this.userPostsFacade.getPosts()
      .subscribe(posts => {
        this.allPosts = posts;
        this.displayedPosts = this.allPosts.slice(this.startBound, this.endBound);
      });

    this.userSub = this.authService.loggedInUser$.subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public next(): void {
    if(this.nextDisabled) return;

    this.startBound += this.POSTS_PER_PAGE;
    this.endBound += this.POSTS_PER_PAGE;    
    this.displayedPosts = this.allPosts.slice(this.startBound, this.endBound);
  }

  public prev(): void {
    if(this.prevDisabled) return;

    this.startBound -= this.POSTS_PER_PAGE;
    this.endBound -= this.POSTS_PER_PAGE;    
    this.displayedPosts = this.allPosts.slice(this.startBound, this.endBound);
  }

  get nextDisabled(): boolean {
    return this.endBound >= this.allPosts.length;
  }

  get prevDisabled(): boolean {
    return this.startBound <= 0;
  }

}
