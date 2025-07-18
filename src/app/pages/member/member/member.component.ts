import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MemberService } from '../../../services/member/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
})
export class MemberComponent {     
  memberForm :FormGroup;   
  previewAdharUrl: string | ArrayBuffer | null = null;
  imageAdharError: string | null = null;
  previewReceiptUrl: string | ArrayBuffer | null = null;
  imageReceiptError: string | null = null;
  maxFileSizeMB = 2;
  
  constructor(
      private fb: FormBuilder,
    private memberService: MemberService,
      private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<MemberComponent>
  ) {
      this.memberForm = this.fb.group({
      name: ['', Validators.required],
      fName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onAdharSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    this.imageAdharError = null;
    this.previewAdharUrl = null;

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = this.maxFileSizeMB * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        this.imageAdharError = 'Only JPG and PNG images are allowed.';
        return;
      }

      if (file.size > maxSize) {
        this.imageAdharError = `File size should be less than ${this.maxFileSizeMB}MB.`;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.previewAdharUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

   onSubmit(){
    if (this.memberForm.invalid) return;

    const memberData = this.memberForm.value;
       this.memberService.addMember(memberData);
      this.snackBar.open('Blog added successfully!', 'Close', { duration: 3000 });
  }

  onReceiptSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    this.imageReceiptError = null;
    this.previewReceiptUrl = null;

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = this.maxFileSizeMB * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        this.imageReceiptError = 'Only JPG and PNG images are allowed.';
        return;
      }

      if (file.size > maxSize) {
        this.imageReceiptError = `File size should be less than ${this.maxFileSizeMB}MB.`;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.previewReceiptUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
