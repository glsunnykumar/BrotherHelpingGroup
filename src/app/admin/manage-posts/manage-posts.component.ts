import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Post, PostService } from '../../services/post/post.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-posts',
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.scss',
})
export class ManagePostsComponent {
  private postService = inject(PostService);
  private router = inject(Router);

  posts: Post[] = [];
  private dialog = inject(MatDialog);

  constructor() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log('Posts:', this.posts);
    });
  }

  edit(post: Post) {
    this.router.navigate(['/admin/edit-post', post.id]);
  }

  async delete(id: string | undefined) {
    if (!id) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.postService.deletePost(id);
      }
    });
  }
}
