import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-edit-post',
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './add-edit-post.component.html',
  styleUrl: './add-edit-post.component.scss',
})
export class AddEditPostComponent {
  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  selectedFile!: File;
  postId: string | null = null;
  isSubmitting = false;

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    location: ['', Validators.required],
    eventDate: ['', Validators.required],
    imageUrl: [''],
  });

  constructor() {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {

  this.postId = this.route.snapshot.paramMap.get('id');

  if (this.postId) {

    const postDoc = await this.postService.getPostById(this.postId);

    if (postDoc.exists()) {

      const postData: any = postDoc.data();

      this.form.patchValue({
        title: postData.title,
        description: postData.description,
        location: postData.location,
        eventDate: postData.eventDate
      });

    }

  }

}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      this.isSubmitting = true;

      let imageUrl = this.form.value.imageUrl || '';

      if (this.selectedFile) {
        imageUrl = await this.postService.uploadImage(this.selectedFile);
      }

      const data = {
        ...this.form.value,
        imageUrl,
      };

      if (this.postId) {
        await this.postService.updatePost(this.postId, data);

        this.snackBar.open('Post updated successfully 🎉', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      } else {
        await this.postService.addPost(data as any);

        this.snackBar.open('Post added successfully 🎉', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });

        this.form.reset();
      }

      this.router.navigate(['/admin/manage-posts']);
    } catch (error) {
      this.snackBar.open('Something went wrong ❌', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    } finally {
      this.isSubmitting = false;
    }
  }
}
