import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../services/post/post.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { doc, getDoc } from '@angular/fire/firestore';
import { GlobalLoaderComponent } from "../../shared/global-loader/global-loader.component";

@Component({
  selector: 'app-add-edit-post',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    GlobalLoaderComponent
],
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
  previewImage: string | null = null;
  isLoading = false;
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
      this.isLoading = true;

      const postDoc = await this.postService.getPostById(this.postId);

      if (postDoc.exists()) {
        const postData: any = postDoc.data();

        this.form.patchValue({
          title: postData.title,
          description: postData.description,
          location: postData.location,
          eventDate: postData.eventDate,
        });

        this.previewImage = postData.imageUrl;
      }
      this.isLoading = false;
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
    this.isSubmitting = true;
    this.isLoading = true;

    let imageUrl = this.previewImage;

    if (this.selectedFile) {
      imageUrl = await this.postService.uploadImage(this.selectedFile);
    }

      const data = {
    title: this.form.value.title ?? '',
    description: this.form.value.description ?? '',
    location: this.form.value.location ?? '',
    eventDate: this.form.value.eventDate ?? '',
    imageUrl: imageUrl ?? '',
    createdAt: new Date()
  };

    if (this.postId) {
      await this.postService.updatePost(this.postId, data);

      this.snackBar.open('Post updated successfully', 'Close', {
        duration: 3000,
      });
    } else {
      await this.postService.addPost(data);

      this.snackBar.open('Post added successfully', 'Close', {
        duration: 3000,
      });
    }
    this.isLoading = false;
    this.router.navigate(['/admin/manage-posts']);
  }
}
