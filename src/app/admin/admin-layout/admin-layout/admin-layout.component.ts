import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar/sidebar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-layout',
    imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SidebarComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
 isCollapsed = signal(false);
  isMobile = signal(false);

  constructor(private breakpointObserver: BreakpointObserver){
    this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Tablet])
    .subscribe(result  =>{
      this.isMobile.set(result.matches);
      if (result.matches) {
        this.isCollapsed.set(true);
      }
    })
  }

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
