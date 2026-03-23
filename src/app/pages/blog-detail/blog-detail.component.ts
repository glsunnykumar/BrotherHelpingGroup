import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../admin/blog/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  blog: any;

  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.blog = await this.blogService.getBlogById(id);
    }

  }


}
