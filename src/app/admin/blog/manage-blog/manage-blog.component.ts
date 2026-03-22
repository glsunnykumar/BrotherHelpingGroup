import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../blog.service';
import { GlobalLoaderComponent } from "../../../shared/global-loader/global-loader.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-blog',
  imports: [CommonModule, 
    ReactiveFormsModule, 
    RouterModule, 
    MatButtonModule,
    GlobalLoaderComponent],
  templateUrl: './manage-blog.component.html',
  styleUrl: './manage-blog.component.scss',
})
export class ManageBlogComponent {
  fb = inject(FormBuilder);
  blogService = inject(BlogService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  blogId: string | null = null;
  previewImage: any;
  selectedFile!: File;
   blogs: any[] = [];
isLoading = false;

  form = this.fb.nonNullable.group({
    title: [''],
    content: [''],
    author: [''],
  });

  async ngOnInit() {
      this.isLoading = true;
    this.blogId = this.route.snapshot.paramMap.get('id');

    if (this.blogId) {
      const data: any = await this.blogService.getBlogById(this.blogId);

      this.form.patchValue(data);
      this.previewImage = data.imageUrl;
    }
    else {
      this.blogService.getBlogs().subscribe((blogs) => {
        this.blogs = blogs;
      });
    }
      this.isLoading = false;

  }

  edit(id: string) {
    this.router.navigate(['/admin/edit-blog', id]);
  }

  async delete(id: string) {

    if (confirm('Delete this blog?')) {
      await this.blogService.deleteBlog(id);
    }

  }

  onFileChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewImage = reader.result);
      reader.readAsDataURL(file);
    }
  }

  async submit() {
    let imageUrl = this.previewImage;

    if (this.selectedFile) {
      imageUrl = await this.blogService.uploadImage(this.selectedFile);
    }

    const data = {
      title: this.form.value.title ?? '',
      content: this.form.value.content ?? '',
      author: this.form.value.author ?? '',
      imageUrl: imageUrl,
    };

    if (this.blogId) {
      await this.blogService.updateBlog(this.blogId, data);
    } else {
      await this.blogService.addBlog(data);
    }

    this.router.navigate(['/admin/blogs']);
  }
}
