import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../admin/blog/blog.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule ,
    MatIconModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {

  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);

  readingTime: number = 0;
relatedBlogs: any[] = [];
  blog: any;

  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.blog = await this.blogService.getBlogById(id);
        this.calculateReadingTime(this.blog.content);
      // Fetch related blogs
    this.blogService.getBlogs().subscribe(res => {
      this.relatedBlogs = res.filter(b => b.id !== id).slice(0, 3);
    });
    }

  }

  calculateReadingTime(text: string) {
  const words = text.split(' ').length;
  this.readingTime = Math.ceil(words / 200); // 200 words/min
}

share(platform: string){

  const url = window.location.href;
  console.log(url);

  if(platform === 'whatsapp'){
    window.open(`https://wa.me/?text=${url}`);
  }

  if(platform === 'facebook'){
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

}


}
