import { Component, computed, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ReusableTableComponent } from '../reusable-table/reusable-table.component';
import { MemberService } from '../../services/member/member.service';
import { UpdateMemberStatusComponent } from '../update-member-status/update-member-status.component';
// import { ReusableTableComponent } from '../reusable-table/reusable-table.component';
// import { EnquireService } from '../../service/enquire/enquire.service';
// import { EnquiryEditComponentComponent } from '../enquiry-edit/enquiry-edit-component/enquiry-edit-component.component';


@Component({
  selector: 'app-admin-dashboard',
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
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
    totalMember = signal(0);
  pendingMember= signal(0);
  // completedBookings = signal(0);
  // totalRevenue = signal(0);
 // displayedColumns: string[] = ['name', 'date', 'status', 'actions'];
 // dataSource = new MatTableDataSource<any>();
  members: any[] = [];
  isLoading = true;

  recentBookings = signal<any[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private memberService: MemberService
  ) {
    //this.fetchDashboardData();
    this.fetchMembers();
  }

  fetchMembers() {
    this.memberService.getMembers().subscribe((data) => {
    this.totalMember.set(data.length);
    this.members = data;
      // Calculate pending count
  const pendingMember = data.filter(enquiry => enquiry.status === 'pending').length;
  this.pendingMember.set(pendingMember);
    this.isLoading = false;
  });
  }

  openEditDialog(booking: any): void {
    const isSmallScreen = this.breakpointObserver.isMatched(
      Breakpoints.Handset
    );

    // const dialogRef = this.dialog.open(EditBookingDialogComponent, {
    //   width: '400px',
    //   data: booking
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // handle the update
    //     //this.fetchDashboardData(); // Reload updated data
    //     console.log('Updated Booking:', result);
    //   }
    // });
  }

  openConfirmDialog(booking: any): void {
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   width: '300px',
    //   data: {
    //     message: `Are you sure you want to delete the booking for ${booking.name}?`
    //   }
    // });
    // dialogRef.afterClosed().subscribe(confirmed => {
    //   if (confirmed) {
    //     // handle the delete
    //     console.log('Booking deleted:', booking.id);
    //   }
    // });
  }

  openMemberForm(member:any) {
 const dialogRef = this.dialog.open(UpdateMemberStatusComponent, {
    width: '400px',
    data: member
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'updated') {
      // Refresh list or show snackbar
      this.fetchMembers(); // example refresh method
    }
  });
  }

  deleteMember(id: string) {
    console.log('blog data is', id);
    if (confirm('Are you sure you want to delete this hoel?')) {
       this.memberService.deleteMember(id).then(() => this.fetchMembers());
    }
  }

}
