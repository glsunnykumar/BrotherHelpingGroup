import { Component, computed, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ReusableTableComponent } from '../reusable-table/reusable-table.component';
import { MemberService } from '../../services/member/member.service';

import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { UpdateRequestStatusComponent } from '../update-request-status/update-request-status.component';
@Component({
  selector: 'app-user-request',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatDialogModule,
    ReusableTableComponent,
  ],
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.scss',
})
export class UserRequestComponent {
  totalRequests = signal(0);
  pendingRequests = signal(0);
  requests: any[] = [];
  isLoading = true;

  recentRequests = signal<any[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private memberService: MemberService
  ) {
    console.log('fetching the request');
    //this.fetchDashboardData();
    this.fetchRequests();
  }

  fetchRequests() {
    this.memberService.getRequests().subscribe((data) => {
      this.totalRequests.set(data.length);
      this.requests = data;
      // Calculate pending count
      const pendingMember1 = data.filter(
        (enquiry) => enquiry.status === 'pending'
      ).length;
      this.pendingRequests.set(pendingMember1);
      this.isLoading = false;
    });
  }

  openRequestForm(member: any) {
    const dialogRef = this.dialog.open(UpdateRequestStatusComponent, {
      width: '400px',
      data: member,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        // Refresh list or show snackbar
        this.fetchRequests(); // example refresh method
      }
    });
  }

  deleteRequest(request: any) {
    console.log('member are ', request);
    if (confirm('Are you sure you want to delete this member?')) {
      const imagePath = this.memberService.extractStoragePathFromUrl(
        request.requestFile

      );

      this.memberService.deleteRequest(request.id).then(() => {
        if (imagePath) {
          this.memberService.deleteProfileImage(imagePath);
        }
        this.fetchRequests(); // Refresh list
      });
    }
  }
}
