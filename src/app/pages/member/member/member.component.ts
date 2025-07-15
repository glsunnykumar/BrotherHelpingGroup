import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';  
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-member',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  constructor(public dialogRef: MatDialogRef<MemberComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
