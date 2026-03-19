import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SafeUrlPipe } from '../../shared/safe-url.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-video-dialog',
  imports: [
    CommonModule
    ,MatDialogModule,
  MatIconModule,
    SafeUrlPipe],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss'
})
export class VideoDialogComponent {

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
     private dialogRef: MatDialogRef<VideoDialogComponent>
  ) {}

    close(){
    this.dialogRef.close();
  }

}
