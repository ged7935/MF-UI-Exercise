import { Component, OnInit } from '@angular/core';
import { UserPostsFacade } from '../../facade/userPosts.facade';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../model/post.model';
import { CanDeactivateGuard } from '../../guards/canDeactivateGuard.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, CanDeactivateGuard {
  private readonly TITLE_MAX_LENGTH: number = 200;
  private readonly MESSAGE_MAX_LENGTH: number = 2000;

  postForm: FormGroup;
  originalPost: Post;
  isEditMode: boolean = false;

  constructor(private userPostsFacade: UserPostsFacade, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) 
  { 
    this.createPostForm(); 
  }

  private createPostForm() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)]],
      message: ['', [Validators.required, Validators.maxLength(this.MESSAGE_MAX_LENGTH)]]
    });
  }

  canDeactivate(): boolean {
    if(this.postForm.pristine) return true;

    if(confirm("Any changes will not be saved. Are you sure?")) return true;
    return false;
  }

  ngOnInit(): void {
    let postId = this.route.snapshot.paramMap.get("id");

    if(postId){
      this.isEditMode = true;
      this.userPostsFacade.getPost(+postId).subscribe(post => {
        post.body = post.body.split('\n').join('');
        this.title.setValue(post.title);
        this.message.setValue(post.body);
        this.originalPost = post;
      });
    }
  }  

  get title() {
    return this.postForm.get("title");
  }

  get message() {
    return this.postForm.get("message");
  }

  get submitDisabled(): boolean {
    if(this.isEditMode) return !this.postForm.valid || (this.originalPost.title === this.title.value && this.originalPost.body === this.message.value);
    return !this.postForm.valid;
  }

  get cancelDisabled(): boolean {
    if(this.isEditMode) return this.originalPost.title === this.title.value && this.originalPost.body === this.message.value;
    return !this.postForm.valid;
  }

  public savePost(): void {
    if(this.isEditMode){
      let updatedPost = new Post(this.originalPost.id, this.originalPost.userId, this.title.value, this.message.value);
      this.userPostsFacade.updatePost(updatedPost).subscribe(() => this.redirectHome());
    }
    else {
      this.userPostsFacade.addPost(this.title.value, this.message.value).subscribe(() => this.redirectHome());
    }
  }

  public deletePost(): void {
    if(confirm("Are you sure you want to delete this post?")){
      this.userPostsFacade.deletePost(this.originalPost.id).subscribe(() => this.redirectHome());
    }    
  }

  public cancel(): void {
    this.router.navigate(["/"]);
  }

  public redirectHome(): void {
    this.postForm.reset(); 
    this.router.navigate(['/']);
  }

}
