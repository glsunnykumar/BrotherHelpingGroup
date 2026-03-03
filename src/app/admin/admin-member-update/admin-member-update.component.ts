import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-admin-member-update',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-member-update.component.html',
  styleUrl: './admin-member-update.component.scss'
})
export class AdminMemberUpdateComponent {
  memberForm!: FormGroup;

}
