import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-memberdetailmodal',
  imports: [
    MatDialogModule
  ],
  templateUrl: './memberdetailmodal.component.html',
  styleUrl: './memberdetailmodal.component.scss'
})
export class MemberdetailmodalComponent {
constructor(
    public dialogRef: MatDialogRef<MemberdetailmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public member: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
