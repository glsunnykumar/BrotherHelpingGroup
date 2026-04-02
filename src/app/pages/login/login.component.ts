import { Component, inject, Optional } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLoginMode = false; // toggle between login/register
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Optional() private dialogRef?: MatDialogRef<LoginComponent>,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      this.router.navigate(['/admin']); // ✅ use parentheses, not square brackets
      this.closeModal();
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  closeModal() {
    if (this.dialogRef) this.dialogRef.close();
  }

  forgotPassword() {
    console.log('Forgot Password Clicked');
  }

  async register() {
    if (this.signupForm.invalid) return;

    const { email, password, displayName } = this.signupForm.value;

    try {
      console.log('Register Clicked');

      // 🔥 Create user
      const userCredential = await this.authService.register(email, password);

      // 🔥 Update display name
      if (userCredential.user && displayName) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
      }

      console.log('Registration successful');

      // 🔥 Redirect after register
      this.router.navigate(['/admin']);

      // Close modal
      this.closeModal();
    } catch (error: any) {
      console.error('Registration failed:', error.message);

      // Optional: show error in UI
    }
  }
}
