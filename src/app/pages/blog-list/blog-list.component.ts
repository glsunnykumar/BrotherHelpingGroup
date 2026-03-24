import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../admin/blog/blog.service';
import { GlobalLoaderComponent } from '../../shared/global-loader/global-loader.component';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, GlobalLoaderComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent {
  private blogService = inject(BlogService);
  private router = inject(Router);

  blogs: any[] = [];
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;

    this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.blogs = res;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
        this.isLoading = false;
      },
    });
  }

  openBlog(id: string) {
    this.router.navigate(['/blog', id]);
  }
}
