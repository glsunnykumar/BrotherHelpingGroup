import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MemberService } from '../../services/member/member.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-request-status',
  imports: [
      MatDialogContent,
       FormsModule,
       MatFormFieldModule,
       MatSelectModule,
       MatDialogModule,
       MatButtonModule,
       MatInputModule,
       
  ],
  templateUrl: './update-request-status.component.html',
  styleUrl: './update-request-status.component.scss'
})
export class UpdateRequestStatusComponent {
 status: string = 'Active'; // default selection


 constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateRequestStatusComponent>,
    private memberService: MemberService
  ) {}


  formatCreatedAt(val: any): string {
  const asDate =
    val?.toDate ? val.toDate() :
    (val instanceof Date ? val : (val ? new Date(val) : null));

  return asDate ? new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium', timeStyle: 'short'
  }).format(asDate) : '';
}

   updateStatus() {
    console.log('member data received',this.data);
    this.memberService.updateRequestStatus(this.data.id, this.status).then(() => {
      this.dialogRef.close('updated');
    });
  }

  close() {
    this.dialogRef.close();
  }
}
