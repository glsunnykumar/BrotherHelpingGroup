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
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];

    const path = `uploads/${Date.now()}_${file.name}`;
    try {
      const downloadUrl = await this.imageUploadService.uploadImage(file, path);
      this.imageUrl = downloadUrl;
      console.log('adhar File uploaded to firebase with url:', downloadUrl);

      // Optional: Save downloadUrl to Firestore here
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }

  async submitHelpRequest(){
    if (this.helpRequestForm.valid) {
      this.isLoading = true;
      const formData = {
        ...this.helpRequestForm.value,
        requestFile: this.imageUrl ?? null,
        status: 'pending',
      };
      try {
        await this.memberService.addRequest(formData);
        this.snackBar.open(
          'Request added successfully! Please wait for admin approval',
          'Close',
          { duration: 3000 }
        );
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error adding member:', error);
        this.snackBar.open('Failed to add member. Try again.', 'Close', {
          duration: 3000,
        });
      } finally {
        this.helpRequestForm.reset();
        this.isLoading = false;
      }
    }
  }
}
