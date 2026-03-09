import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { WordLimitPipe } from '../../pipe/word-limit.pipe';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-contribution',
  imports: [MatCardModule, MatButtonModule, CommonModule, WordLimitPipe],
  templateUrl: './contribution.component.html',
  styleUrl: './contribution.component.scss',
})
export class ContributionComponent {
  private postService = inject(PostService);

  contributions: any[] = [];

  ngOnInit() {
    this.postService.getPosts().subscribe((posts) => {
      this.contributions = posts.map((post) => ({
        ...post,
        isExpanded: false,
      }));
    });
  }

  // contributions = [
  //   {
  //     title: 'ब्रदर हेल्पिंग ग्रुप के द्वारा एक बेटी के विवाह के लिए मदद की गई',
  //     description: 'ब्रदर हेल्पिंग ग्रुप के द्वारा...',
  //     image: 'assets/Ichi.jpg',
  //     date: '2025-09-11',
  //     location: 'Chetru Bagli , Kangra H.P',
  //     isExpanded: false
  //   }
  // ];
}
