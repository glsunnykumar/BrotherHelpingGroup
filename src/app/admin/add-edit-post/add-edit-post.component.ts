import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-add-edit-post',
 imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-post.component.html',
  styleUrl: './add-edit-post.component.scss'
})
export class AddEditPostComponent {
 private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedFile!: File;
  postId: string | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    eventDate: ['', Validators.required],
    imageUrl: ['']
  });

  constructor() {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async submit() {

    let imageUrl = '';

    if (this.selectedFile) {
      //imageUrl = await this.postService.uploadImage(this.selectedFile);
    }

    const data = {
      ...this.form.value,
      imageUrl
    };

    if (this.postId) {
      await this.postService.updatePost(this.postId, data);
    } else {
      await this.postService.addPost(data as any);
    }

    this.router.navigate(['/admin/manage-posts']);
  }
}
