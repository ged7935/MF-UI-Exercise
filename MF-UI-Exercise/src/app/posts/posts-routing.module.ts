import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsTableComponent } from './components/post-table/posts-table.component';
import { PostComponent } from './components/post/post.component';
import { CanDeactivateGuard } from './guards/canDeactivateGuard.service';

const routes: Routes = [
  { path: '', component: PostsTableComponent },
  { path: 'post', component: PostComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'post/:id', component: PostComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
