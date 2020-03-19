import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post.model';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/core.module';

@Injectable({
  providedIn: 'root'
})
export class PostsApi {
  private readonly postsUrl: string = "https://jsonplaceholder.typicode.com/posts";

  private nextPostId: number;  

  constructor(private _httpClient: HttpClient, private authService: AuthService) { 
    if(this.state) this.nextPostId = Math.max(this.state[0].id, this.state[this.state.length - 1].id) + 1;
  }

  private _state: Post[];

  private get state(): Post[] {
    let storedState = JSON.parse(localStorage.getItem("posts"));
    this._state = storedState;
    return this._state;
  }

  private set state(state: Post[]) {
    this._state = state;
    this.syncState();
  }

  private syncState() {
    localStorage.setItem("posts", JSON.stringify(this._state));
  }

  public getAll(): Observable<Post[]> {
    if(this.state) return of(this.state);

    return this._httpClient.get<Post[]>(this.postsUrl)
      .pipe(
        tap(posts => {
          this.nextPostId = posts[posts.length - 1].id + 1;
          this.state = posts;
        }),
        first()
      );
  }

  public get(postId: number): Observable<Post> {    
    if(this.state) return of(this.state.find(p => p.id === postId));

    return this._httpClient.get<Post>(`${this.postsUrl}/${postId}`).pipe(first());
  }

  public add(title: string, message: string) : Observable<Post> {
    let post = new Post(this.nextPostId++, this.authService.loggedInUser.id, title, message);
    this.state.unshift(post);
    this.syncState();
    return of(post);
  }

  public update(post: Post) : Observable<Post> {
    let postIndex = this.state.findIndex(p => p.id === post.id);
    this.state[postIndex] = post;
    this.syncState();
    return of(post);
  }

  public delete(postId: number) : Observable<boolean> {    
    let postIndex = this.state.findIndex(p => p.id === postId);
    this.state.splice(postIndex, 1);
    this.syncState();
    return of(true);
  }
}
