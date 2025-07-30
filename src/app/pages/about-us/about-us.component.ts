import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageUploadService } from '../../services/image/image-upload.service';
import { MemberService } from '../../services/member/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalLoaderComponent } from "../../shared/global-loader/global-loader.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, GlobalLoaderComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  helpRequestForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  isLoading = false;
  uploadPromise?: Promise<string>;
  isUploading = false;


  constructor(
    private fb: FormBuilder,
    private imageUploadService: ImageUploadService,
    private memberService: MemberService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.helpRequestForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      details: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onFileSelected(event: Event) {
   const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const path = `uploads/${Date.now()}_${file.name}`;
  this.isUploading = true;
  this.uploadPromise = this.imageUploadService.uploadImage(file, path)
    .then((url) => {
      this.imageUrl = url;
      return url;
    })
    .finally(() => this.isUploading = false);
  }

  async submitHelpRequest(){
    if (this.helpRequestForm.valid) {
      this.isLoading = true;
  try {
    // If upload is in progress, wait for it
    if (this.uploadPromise) {
      await this.uploadPromise;
    }

    const formData = {
      ...this.helpRequestForm.value,
      requestFile: this.imageUrl ?? null, // now resolved
      status: 'pending',
    };

    await this.memberService.addRequest(formData);
    this.snackBar.open('Request added successfully! Please wait for admin approval', 'Close', { duration: 3000 });
    this.router.navigate(['/home']);
  } catch (e) {
    console.error(e);
    this.snackBar.open('Failed to add request. Try again.', 'Close', { duration: 3000 });
  } finally {
    this.helpRequestForm.reset();
    this.isLoading = false;
  }

    }
  }
}
