import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
 imports: [CommonModule, RouterModule,MatIconModule,
 MatMenuModule,
    MatIconModule,
    MatButtonModule

  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  isCollapsed = false; // Sidebar state
   //private authService = inject(AuthService);

   expandedMenu: string | null = null;

   isCarMenuOpen = false;
   isBlogMenuOpen = false;

toggleCarMenu() {
  this.isCarMenuOpen = !this.isCarMenuOpen;
}

toggleBlogMenu() {
  this.isBlogMenuOpen = !this.isBlogMenuOpen;
}

toggleSubmenu(menu: string): void {
  this.expandedMenu = this.expandedMenu === menu ? null : menu;
}

    constructor(private router: Router) {
  }

  onLinkClick() {
    this.sidebarToggle.emit();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout(){
    this.router.navigate(['/']);
    // this.authService.logout(); // Implement logout logic
  }

}
