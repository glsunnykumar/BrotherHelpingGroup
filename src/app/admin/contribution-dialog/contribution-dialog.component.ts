import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { GlobalLoaderComponent } from '../../shared/global-loader/global-loader.component';

@Component({
  selector: 'app-contribution-dialog',
  imports: [
     ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        CommonModule,
        MatRadioModule,
  ],
  templateUrl: './contribution-dialog.component.html',
  styleUrl: './contribution-dialog.component.scss'
})
export class ContributionDialogComponent {

  contributionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContributionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contributionForm = this.fb.group({
      contributorName: [data?.contribution?.contributorName || '', Validators.required],
      amount: [data?.contribution?.amount || '', [Validators.required, Validators.min(1)]],
      date: [data?.contribution?.date || '', Validators.required],
      notes: [data?.contribution?.notes || '']
    });
  }

  onSave() {
    if (this.contributionForm.valid) {
      this.dialogRef.close(this.contributionForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
