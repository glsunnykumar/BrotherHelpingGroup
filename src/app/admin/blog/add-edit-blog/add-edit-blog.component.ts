import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogService } from '../blog.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-add-edit-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.scss'],
})
export class AddEditBlogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  blogId: string | null = null;

  selectedFile!: File;
  previewImage: string | null = null;

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    author: ['', Validators.required],
  });

  async ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
     console.log('Fetched blog data:', this.blogId);

    if (this.blogId) {
      const data: any = await this.blogService.getBlogById(this.blogId);
      console.log('Fetched blog data:', data);

      this.form.patchValue({
        title: data.title,
        content: data.content,
        author: data.author,
      });

      this.previewImage = data.imageUrl;
    }

    else {
      const user = this.authService.userSignal();
      if (user) {
        this.form.patchValue({
          author: user.displayName || 'Anonymous',
        });
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.previewImage = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  async submit() {
    if (this.form.invalid) return;
    const user = this.authService.userSignal();
    if (!user) {
      console.error('User not logged in');
      return;
    }

    let imageUrl = this.previewImage ?? '';

    if (this.selectedFile) {
      imageUrl = await this.blogService.uploadImage(this.selectedFile);
    }

    const data = {
      title: this.form.value.title ?? '',
      content: this.form.value.content ?? '',
      // 🔥 Use logged-in user's display name
      author: user.displayName || 'Anonymous',

      // 🔥 (Recommended) also store user id
      authorId: user.uid,
      imageUrl: imageUrl,
      createdAt: new Date(),
    };

    console.log('Submitting blog data:', data);

    if (this.blogId) {
      await this.blogService.updateBlog(this.blogId, data);
    } else {
      await this.blogService.addBlog(data);
    }

    this.router.navigate(['/admin/blogs']);
  }
}
