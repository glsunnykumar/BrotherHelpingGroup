import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalLoaderComponent } from '../../shared/global-loader/global-loader.component';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { JobfairService } from '../../services/jobfair/jobfair.service';

@Component({
  selector: 'app-job-fair',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatRadioModule,
    GlobalLoaderComponent,
  ],
  templateUrl: './job-fair.component.html',
  styleUrl: './job-fair.component.scss',
})
export class JobFairComponent {
  jobFairForm: FormGroup;
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
  qualificationOptions: string[] = ['10th Pass', '12th Pass', 'Diploma', 'Graduate','Other'];
 
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<JobFairComponent>,
    private jobfairService: JobfairService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.jobFairForm = this.fb.group({
      name: ['', Validators.required],
      fName: ['', Validators.required],
      address: ['', Validators.required],
      contactNumber: ['', Validators.required],
      qualification: [null, Validators.required],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.jobFairForm.invalid) return;
    this.isLoading = true;
    const memberData = {
      ...this.jobFairForm.value,
      status: 'pending',
    };

    try {
      if (this.data && this.data.member) {
        // 🔹 EDIT MODE
        await this.jobfairService.updateAspirant(this.data.member.id, memberData);
        this.dialogRef.close(memberData);
        this.snackBar.open('Member updated successfully!', 'Close', {
          duration: 3000,
        });
      } else {
        await this.jobfairService.addAspirant(memberData);
        this.dialogRef.close(true);
        this.snackBar.open(
          'Registered successfully!Team will Revert back soon',
          'Close',
          { duration: 3000 },
        );
      }
    } catch (error) {
      console.error('Error adding member:', error);
      this.snackBar.open('Failed to add member. Try again.', 'Close', {
        duration: 3000,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
