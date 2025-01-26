import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-about-us',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  helpRequestForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.helpRequestForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      details: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  submitHelpRequest(): void {
    if (this.helpRequestForm.valid) {
      const formData = new FormData();
      formData.append('name', this.helpRequestForm.get('name')!.value);
      formData.append('email', this.helpRequestForm.get('email')!.value);
      formData.append('phone', this.helpRequestForm.get('phone')!.value);
      formData.append('details', this.helpRequestForm.get('details')!.value);

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      console.log('Help request submitted:', formData);
      alert('Your request has been submitted successfully!');
    } else {
      alert('Please fill in all required fields!');
    }
  }


}
