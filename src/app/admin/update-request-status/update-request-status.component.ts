import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MemberService } from '../../services/member/member.service';
import { MatInputModule } from '@angular/material/input';
import { GlobalLoaderComponent } from "../../shared/global-loader/global-loader.component";

@Component({
  selector: 'app-update-request-status',
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    GlobalLoaderComponent
],
  templateUrl: './update-request-status.component.html',
  styleUrl: './update-request-status.component.scss'
})
export class UpdateRequestStatusComponent {
  statusForm!: FormGroup;


 constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateRequestStatusComponent>,
    private memberService: MemberService,
      private fb: FormBuilder,
  ) {
      this.statusForm = this.fb.group({
      status: [this.data.status || '', Validators.required],
      comment: [this.data.comment || '', Validators.required],
    });
  }


  formatCreatedAt(val: any): string {
  const asDate =
    val?.toDate ? val.toDate() :
    (val instanceof Date ? val : (val ? new Date(val) : null));

  return asDate ? new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium', timeStyle: 'short'
  }).format(asDate) : '';
}

isLoading = false;

onSubmitStatusUpdate(): void {
  if (this.statusForm.invalid) return;

  this.isLoading = true; // Start loading
  const { status, comment } = this.statusForm.value;

  this.memberService.updateRequestStatus(this.data.id, { status, comment })
    .then(() => {
      this.dialogRef.close(true);
    })
    .catch((error) => {
      console.error('Error updating status:', error);
      // Optionally handle error (e.g., show a snackbar)
    })
    .finally(() => {
      this.isLoading = false; // End loading
    });
}


  close(): void {
    this.dialogRef.close();
  }
}
