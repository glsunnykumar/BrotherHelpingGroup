import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MemberService } from '../../services/member/member.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-member-status',
  imports: [
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './update-member-status.component.html',
  styleUrl: './update-member-status.component.scss'
})
export class UpdateMemberStatusComponent {
 status: string = 'Active'; // default selection


 constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateMemberStatusComponent>,
    private memberService: MemberService
  ) {}


   updateStatus() {
    console.log('member data received',this.data);
    this.memberService.updateStatus(this.data.id, this.status).then(() => {
      this.dialogRef.close('updated');
    });
  }

  close() {
    this.dialogRef.close();
  }
}
