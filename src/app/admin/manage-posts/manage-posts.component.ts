import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Post, PostService } from '../../services/post/post.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalLoaderComponent } from "../../shared/global-loader/global-loader.component";

@Component({
  selector: 'app-manage-posts',
  imports: [CommonModule, RouterModule, GlobalLoaderComponent],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.scss',
})
export class ManagePostsComponent {
  private postService = inject(PostService);
  private router = inject(Router);

  posts: Post[] = [];
  private dialog = inject(MatDialog);
  isLoading = false;

  constructor() {
    this.isLoading = true;
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log('Posts:', this.posts);
      this.isLoading = false;
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
