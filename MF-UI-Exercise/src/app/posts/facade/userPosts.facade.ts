import { Injectable } from '@angular/core';
import { Observable, forkJoin, Subject } from 'rxjs';
import { Post } from '../model/post.model';
import { PostsApi } from '../api/posts.api';
import { UsersFacade } from 'src/app/user/user.module';
import { UserPost } from '../model/userPost.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserPostsFacade {

  private postActionSubject = new Subject<string>();

  public get postAction$(): Observable<string> {
    return this.postActionSubject.asObservable();
  }

  constructor(private postsApi: PostsApi, private usersFacade: UsersFacade) { }

  public getPosts(): Observable<UserPost[]> {
    return forkJoin({
      posts: this.postsApi.getAll(),
      users: this.usersFacade.getUsers()
    }).pipe(
      map(data => {
        return data.posts.map(p => {
          let user = data.users.find(u => u.id === p.userId);
          return new UserPost(user, p.title, p.body, p.id);
        });        
      })
    );
  }

  public getPost(postId: number): Observable<Post> {
    return this.postsApi.get(postId);
  }

  public addPost(title: string, message: string): Observable<Post> {
    return this.postsApi.add(title, message)
      .pipe(
        tap(() => this.postActionSubject.next("ADD"))
      );
  }

  public deletePost(postId: number): Observable<boolean> {
    return this.postsApi.delete(postId)
      .pipe(
        tap(() => this.postActionSubject.next("DELETE"))
      );
  }

  public updatePost(post: Post): Observable<Post> {
    return this.postsApi.update(post)
      .pipe(
        tap(() => this.postActionSubject.next("UPDATE"))
      );
  }
}
