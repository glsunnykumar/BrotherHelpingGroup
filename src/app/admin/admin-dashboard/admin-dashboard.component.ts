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
    totalEnquiry = signal(0);
  pendingEnquiry = signal(0);
  // completedBookings = signal(0);
  // totalRevenue = signal(0);
 // displayedColumns: string[] = ['name', 'date', 'status', 'actions'];
 // dataSource = new MatTableDataSource<any>();
  bokking: any[] = [];
  isLoading = true;

  recentBookings = signal<any[]>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    //private enquiryService: EnquireService
  ) {
    //this.fetchDashboardData();
    this.fetchEnquiry();
  }

  fetchEnquiry() {
  //   this.enquiryService.getEnquiries().subscribe((data) => {
  //   this.totalEnquiry.set(data.length);
  //   this.bokking = data;
  //     // Calculate pending count
  // const pendingCount = data.filter(enquiry => enquiry.status === 'pending').length;
  // this.pendingEnquiry.set(pendingCount);
  //   this.isLoading = false;
  // });
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

  openBokkingForm(enquiry?: any) {
  //   console.log('blog data is', enquiry.id);
  //    const enquiryId = enquiry.id;

  //   const dialogRef = this.dialog.open(EnquiryEditComponentComponent, {
  //   width: '450px',
  //   data: { id: enquiryId }
  // });

  // dialogRef.afterClosed().subscribe((updated) => {
  //   if (updated) {
  //     // Re-fetch enquiries if needed
  //   }
  // });

    // this.router.navigate(['/admin/add-blog', blog.id]);
  }

  deleteBokking(id: string) {
    console.log('blog data is', id);
    if (confirm('Are you sure you want to delete this hoel?')) {
      // this.blogService.deleteBlog(id).then(() => this.fetchBlogs());
    }
  }

}
