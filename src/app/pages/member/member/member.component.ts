import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MemberService } from '../../../services/member/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageUploadService } from '../../../services/image/image-upload.service';
import { GlobalLoaderComponent } from "../../../shared/global-loader/global-loader.component";
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-member',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    GlobalLoaderComponent
],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
})
export class MemberComponent {
  memberForm: FormGroup;
  adharPreviewUrl: string | ArrayBuffer | null = null;
  adharImageUrl: string | ArrayBuffer | null = null;
  receiptPreviewUrl: string | ArrayBuffer | null = null;
  imageUrl: string | ArrayBuffer | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  receiptImageUrl: string | ArrayBuffer | null = null;
  imageAdharError: string | null = null;
  imageError: string | null = null;
  previewReceiptUrl: string | ArrayBuffer | null = null;
  imageReceiptError: string | null = null;
  maxFileSizeMB = 2;
  membershipOptions: number[] = [300, 500, 1000];
  membershipPlans = [
  { amount: 300, icon: '💼' },
  { amount: 500, icon: '⭐' },
  { amount: 1000, icon: '👑' }
];
   isLoading = false;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private snackBar: MatSnackBar,
    private imageUploadService: ImageUploadService,
    public dialogRef: MatDialogRef<MemberComponent>
  ) {
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      fName: ['', Validators.required],
      address: ['', Validators.required],
      membership: [null, Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onAdharSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      this.adharPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    // Upload to Firebase Storage
    const path = `uploads/${Date.now()}_${file.name}`;
    try {
      const downloadUrl = await this.imageUploadService.uploadImage(file, path);
      this.adharImageUrl = downloadUrl;
      console.log('adhar File uploaded to firebase with url:', downloadUrl);

      // Optional: Save downloadUrl to Firestore here
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }

  async onReceiptSelected(event: Event) {
   const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      this.receiptPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    // Upload to Firebase Storage
    const path = `uploads/${Date.now()}_${file.name}`;
    try {
      const downloadUrl = await this.imageUploadService.uploadImage(file, path);
      this.receiptImageUrl = downloadUrl;
      console.log('adhar File uploaded to firebase with url:', downloadUrl);

      // Optional: Save downloadUrl to Firestore here
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }

  async onImageSelected(event:Event){
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];

    // Show preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    // Upload to Firebase Storage
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

  async onSubmit() {
    if (this.memberForm.invalid) return;
    this.isLoading =true;
    const memberData = {
      ...this.memberForm.value,
      profileImage: this.imageUrl ?? null,
      status: 'pending',
    };
    await this.memberService
      .addMember(memberData)
      .then(() => this.dialogRef.close(true));
    this.snackBar.open(
      'Member added successfully!Please wait for admin approval',
      'Close',
      { duration: 3000 }
    );
    this.isLoading = false; 
  }


}
