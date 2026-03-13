import { Component ,inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

    dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  close(result:boolean){
    this.dialogRef.close(result);
  }


}
