import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-toolbar',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(
     private router:Router,
    public authService: AuthService) {}
  private dialog = inject(MatDialog);
  openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '100%',
      maxWidth: '400px', // controls horizontal scroll
      disableClose: false,
      autoFocus: false,
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']); // ✅ use parentheses, not square brackets
  }
}
