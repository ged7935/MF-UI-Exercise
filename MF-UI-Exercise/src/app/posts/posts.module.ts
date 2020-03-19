import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostsTableComponent } from './components/post-table/posts-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsRoutingModule } from './posts-routing.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [PostComponent, PostsTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    UserModule
  ],
  exports: [PostsTableComponent]
})
export class PostsModule { }
