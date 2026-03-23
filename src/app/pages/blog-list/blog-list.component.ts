import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../admin/blog/blog.service';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {

   private blogService = inject(BlogService);
  private router = inject(Router);

  blogs: any[] = [];

  ngOnInit() {

    this.blogService.getBlogs().subscribe(res => {
      this.blogs = res;
    });

  }

  openBlog(id: string) {
    this.router.navigate(['/blog', id]);
  }

}
