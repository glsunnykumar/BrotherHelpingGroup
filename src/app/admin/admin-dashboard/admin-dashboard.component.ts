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
import { UpdateMemberStatusComponent } from '../update-member-status/update-member-status.component';
import * as XLSX from 'xlsx';
import { deleteObject, getStorage, ref } from '@angular/fire/storage';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
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
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  totalMember = signal(0);
  pendingMember = signal(0);
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
    private memberService: MemberService,
    private firestore: Firestore
  ) {
    //this.fetchDashboardData();
    this.fetchMembers();
  }

  fetchMembers() {
    this.memberService.getMembers().subscribe((data) => {
      this.totalMember.set(data.length);
      this.members = data;
      // Calculate pending count
      const pendingMember1 = data.filter(
        (enquiry) => enquiry.status === 'pending'
      ).length;
      this.pendingMember.set(pendingMember1);
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

  openMemberForm(member: any) {
    const dialogRef = this.dialog.open(UpdateMemberStatusComponent, {
      width: '400px',
      data: member,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        // Refresh list or show snackbar
        this.fetchMembers(); // example refresh method
      }
    });
  }

  deleteMember(member: any) {
    console.log('member are ', member);
    if (confirm('Are you sure you want to delete this member?')) {
      const imagePath = this.memberService.extractStoragePathFromUrl(
        member.profileImage
      );

      this.memberService.deleteMember(member.id).then(() => {
        console.log('Firestore member deleted');
        if (imagePath) {
          this.memberService.deleteProfileImage(imagePath);
        }
        this.fetchMembers(); // Refresh list
      });
    }
  }

  async exportToExcel() {

  const snapshot = await getDocs(collection(this.firestore, 'aspirant'));

  const data: any[] = [];

  snapshot.forEach(doc => {
    const d = doc.data();

    data.push({
      Name: d['name'],
      Mobile: d['contactNumber'],
      Address: d['address'],
      Qualification: d['qualification'],
      Date: d['createdAt']?.toDate ? d['createdAt'].toDate().toLocaleString() : ''
    });
  });

  // Convert JSON → worksheet
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Registrations': worksheet },
    SheetNames: ['Registrations']
  };

  // Download file
  XLSX.writeFile(workbook, 'JobFair_Registrations.xlsx');
}
}
